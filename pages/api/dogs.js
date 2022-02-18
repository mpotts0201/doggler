import {demo_dogs} from "data";

export default (req, res) => {
    res.status(200).json(demo_dogs);
};
