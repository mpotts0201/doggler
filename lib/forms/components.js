import React, {useEffect} from "react";
import {Formik} from "formik";

export const FormLabel = (props) => {
    const {name, renderLabel, def} = props;
    const field_def = props.field_def || def[name];

    return renderLabel ? (
        renderLabel(props)
    ) : (
        <label className={props.className} htmlFor={field_def.secure}>
            {field_def.label}
        </label>
    );
};

export const FormTextInput = (props) => {
    const {def, renderInput, autoComplete, form, validateField, values, isSubmitting, setFieldValue, name, textarea} = props;
    const field_def = props.field_def || def[name];

    const localHandleChange = (e) => {
        const {handleChange} = props;
        e.target.value = _.trimStart(e.target.value);
        handleChange(e);
    };

    const localHandleBlur = (e) => {
        const {handleBlur} = props;
        e.target.value = _.trim(e.target.value);
        handleBlur(e);
        setFieldValue(e.target.name, e.target.value); // update trimmed value to re-validate on the fly
    };

    const localHandleKeyDown = (e) => {
        const {handleKeyDown} = props;
        if (handleKeyDown) {
            handleKeyDown(e);
        }
    };

    if (textarea) {
        return (
            <textarea
                className={props.className}
                readOnly={field_def.readOnly || isSubmitting}
                autoComplete={autoComplete === true ? "" : "new-password"}
                data-form-field={field_def.name}
                type={field_def.type || "text"}
                name={field_def.secure}
                onChange={localHandleChange}
                onBlur={localHandleBlur}
                onKeyDown={localHandleKeyDown}
                value={values[field_def.secure]}
                maxLength={field_def.length || 255}
                style={{height: "100px"}}
            />
        );
    }

    return renderInput ? (
        renderInput(props)
    ) : (
        <input
            className={props.className}
            readOnly={field_def.readOnly || isSubmitting}
            autoComplete={autoComplete === true ? "" : "new-password"}
            data-form-field={field_def.name}
            type={field_def.type || "text"}
            name={field_def.secure}
            onChange={localHandleChange}
            onBlur={localHandleBlur}
            onKeyDown={localHandleKeyDown}
            value={values[field_def.secure]}
            maxLength={field_def.length || 255}
        />
    );
};

export const FormNetworkError = (props) => {
    const {errors, status} = props;
    // console.log(JSON.stringify(errors, null, 4));
    // console.log(JSON.stringify(status, null, 4));

    const error = _.has(status, "network_error") ? status["network_error"] : false;
    return <div className={"form-network-error error"}>{error}</div>;
};

export const FormFieldError = (props) => {
    const {field_def, errors, touched} = props;
    const error = _.has(errors, field_def.secure) ? errors[field_def.secure] : null;
    const touch = touched[field_def.secure] === true;
    return <div className={"form-field-error error"}>{touch && error ? error : false}</div>;
};

export const FormLabelTextInputError = (props) => {
    return (
        <React.Fragment>
            <FormLabelTextInput {...props} />
        </React.Fragment>
    );
};

export const FormLabelTextInput = (props) => {
    return (
        <React.Fragment>
            {props.hideLabel === true ? false : <FormLabel {...props} />}
            <FormTextInput {...props} />
        </React.Fragment>
    );
};

export const FormFields = (props) => {
    const {form} = props;
    return form.defs.map((field_def, i) => {
        return <FormLabelTextInputError {...props} key={i} field_def={field_def} />;
    });
};

export const FormFieldSet = (props) => {
    return (
        <fieldset className={"form-fieldset"}>
            <FormFields {...props} />
        </fieldset>
    );
};

export const FormSubmitButton = (props) => {
    const {renderButton, submitLabel, submittingLabel, isSubmitting, isValid} = props;
    const button_label = isSubmitting ? submittingLabel || "Submitting" : submitLabel || "Submit";
    return renderButton ? (
        renderButton(props)
    ) : (
        <button className={`button is-primary is-medium is-fullwidth form-button-submit ${isSubmitting ? "is-loading" : ""}`} inactive={!isValid || isSubmitting} type={"submit"}>
            {button_label}
            {isSubmitting ? <span className={"form-button-submit-spinner"} /> : false}
        </button>
    );
};

export const FormSelectInput = (props) => {
    const {setFieldValue, values, def, name, options} = props;
    const field_def = props.field_def || def[name];
    const field_options = [{value: "", title: "Select"}, ...options] || [];

    const handleChange = (e) => {
        setFieldValue(values[field_def.secure], e.target.value);
    };

    return (
        <select className="select" value={values[field_def]} onChange={handleChange} name={name}>
            {field_options.map((option, i) => {
                return (
                    <option disabled={i === 0 ? true : false} key={option.value} value={option.value}>
                        {option.title}
                    </option>
                );
            })}
        </select>
    );
};

export const Form = (form_props) => {
    const {form, autoComplete, onSubmit, onReset, onChangedValues, enableReinitialize, render} = form_props;
    const {callSubmit, normalizedInitialValues, normalizedInitialErrors, normalizedInitialTouched, schema, reset, transform} = form;

    const submissionFunction = onSubmit ? onSubmit : callSubmit;
    return (
        <Formik
            enableReinitialize={enableReinitialize || false}
            initialErrors={normalizedInitialErrors}
            initialTouched={normalizedInitialTouched}
            initialValues={normalizedInitialValues}
            onReset={reset || onReset}
            onSubmit={submissionFunction}
            validateOnBlur={true}
            validateOnChange={true}
            validateOnMount={true}
            validationSchema={schema}>
            {(props) => {
                const {values, isValid} = props;

                // call back to track changes from containing component
                useEffect(() => {
                    // console.log('Form values changed', values, isValid);
                    if (onChangedValues) {
                        const formValues = transform(values);
                        onChangedValues(formValues, isValid);
                    }
                }, [values, isValid]);

                const allProps = {...form_props, ...props, ...form_props.form};

                return (
                    <form onReset={props.handleReset} className="form" onSubmit={props.handleSubmit} autoComplete={autoComplete === true ? "" : "off"}>
                        {render(allProps)}
                    </form>
                );
            }}
        </Formik>
    );
};
