import rs from "randomstring";
import * as yup from "yup";
import React from "react";
import numeral from "numeral";

export function createForm(def, options) {
    if (_.isUndefined(options)) options = {};
    // object of name: secure_name..
    const secure = _.keys(def).reduce((acc, field) => {
        acc[field] = options.secure === false ? field : `field-${rs.generate(12)}`;
        return acc;
    }, {});

    const defs = _.keys(def).reduce((acc, field) => {
        // enhance def
        def[field] = _.merge(def[field], {
            type: def[field].type || "text",
            name: field,
            secure: secure[field]
        });

        // push into an array, ideal for .map functions
        acc.push(_.omit(def[field], "yup"));
        return acc;
    }, []);

    const fields = _.keys(def);

    // object of secure_name: name
    const lookup = _.invert(secure);

    const labels = fields.reduce((acc, name) => {
        const secure_name = secure[name];
        acc[secure_name] = def[name].label;
        acc[name] = def[name].label;
        return acc;
    }, {});

    // if (process.env.NEXT_PUBLIC_DEVELOPMENT && false) {
    //     console.log(JSON.stringify(def, null, 4));
    //     console.log(JSON.stringify(defs, null, 4));
    //     console.log(JSON.stringify(labels, null, 4));
    // }

    const shape = fields.reduce((acc, field) => {
        acc[secure[field]] = def[field].yup;
        return acc;
    }, {});

    const schema = yup.object().shape(shape);

    function transform(secureData) {
        return _.keys(secureData).reduce((acc, secure_field) => {
            if (_.has(lookup, secure_field)) {
                acc[lookup[secure_field]] = secureData[secure_field];
            }
            return acc;
        }, {});
    }

    function transformValue(field, value) {
        if (def && def[field]) {
            let style = def && def[field] && def[field].style || "text";

            switch (style) {
                case "currency":
                    return numeral().unformat(value) || 0;

                case "boolean":
                    return Boolean(value);

                default:
                    return _.trim(value);
            }
        } else return value;
    }

    function transformValues(values) {
        // dead simple transpose..
        return _.keys(values).reduce((acc, secure_field) => {
            acc[secure_field] = transformValue(secure_field, values[secure_field]);
            return acc;
        }, {});
    }

    const normalizeObject = (inputValues) => {
        return _.keys(inputValues || {}).reduce((acc, normal_field) => {
            const field = def[normal_field];
            if (field) {
                acc[field.secure] = inputValues[normal_field];
            } else console.error(`Missing def for ${normal_field}, value ignored`)
            return acc;
        }, {});
    }


    // the return is a FUNCTION that is called later, but it has the setup, just not the hook data, ahead of time
    return ({onSubmit, onReset, initialValues, initialErrors, initialTouched}) => {

        // console.log(`CREATE IV: ${JSON.stringify(initialValues, null, 4)}`);

        const normalizedInitialValues = normalizeObject(initialValues || {});
        const normalizedInitialErrors = normalizeObject(initialErrors || {});
        const normalizedInitialTouched = normalizeObject(initialTouched || {});

        const callSubmit = (secureData, bag) => {   // bag is a FormikBag of other params
            const {setSubmitting, setStatus} = bag;
            setStatus(null);                  // clear system error, if any
            // console.log(`SECURE DATA: ${JSON.stringify(secureData, null, 4)}`);
            const formValues = transform(secureData);
            // console.log(`FORM VALUES: ${JSON.stringify(formValues, null, 4)}`);
            const networkData = transformValues(formValues);
            // console.log(`NETWORK DATA: ${JSON.stringify(networkData, null, 4)}`);

            const result = onSubmit(networkData, {...bag, values: formValues});   // fire the submission, pass in the clean data, this is a Promise (likely)
            if (result instanceof Promise) {        // if a Promise...
                setSubmitting(true);                // isSubmitting will be true
                return result.then(() => {          // did it succeed?
                    setSubmitting(false);           // isSubmitting will be false
                }).catch((err) => {                 // did it fail?
                    setSubmitting(false);
                    setStatus({network_error: err.message})
                })
            } else {
                setSubmitting(false);
                return result;
            }
        };

        return {
            // from our def engine
            def,        // copy of the def passed in
            fields,     // array of fields
            defs,       // array of def objects, for .map calls
            schema,     // yup schema created
            secure,     // secure field names, looked up by normal names
            lookup,     // normal field names, looked up by secure names,
            labels,     // labels of the fields, referenced in both secure and non-secure name forms

            normalizedInitialValues,
            normalizedInitialErrors,
            normalizedInitialTouched,

            // special functions
            transform,          // transform secure field data into named field data,
            transformValue,     // transform individual field
            transformValues,    // normalize secure data based on def
            submit: onSubmit,   // data submission function provided by form
            reset: onReset,
            callSubmit,         // helper function usually passed into handleSubmit,
        }
    }
}

export default createForm;
