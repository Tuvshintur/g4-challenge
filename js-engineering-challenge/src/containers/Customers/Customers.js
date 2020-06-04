import React, { Component } from "react";

import Input from "../../component/Input/Input";
import Button from "../../component/Button/Button";
import Spinner from "../../component/Spinner/Spinner";

import axios from "../../axios-custom";
import { checkValidity, updateObject } from "../../utility";
import classes from "./Customers.module.css";

export class Customers extends Component {
    state = {
        customers: [],
        page: 1,
        form: {
            search_type: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "first_name", displayValue: "First Name" },
                        { value: "last_name", displayValue: "Last Name" },
                        { value: "email", displayValue: "Email" },
                    ],
                },
                value: "first_name",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                visible: true,
            },
            first_name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "First Name",
                },
                errormessage: "Please Enter First Name",
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                visible: true,
            },
            last_name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Last Name",
                },
                errormessage: "Please Enter Last Name",
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                visible: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email",
                },
                errormessage: "Please enter valid Email",
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
                visible: false,
            },
        },
        formIsValid: false,
        error: false,
    };

    componentDidMount() {
        const { page } = this.state;
        axios
            .get("/customers/page/" + page)
            .then((response) => {
                const customers = response.data;
                this.setState({ customers: customers, error: false });
            })
            .catch((error) => {
                this.setState({ error: true });
                console.log(error);
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.form[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.form[inputIdentifier].validation),
            touched: true,
        });

        const updatedForm = updateObject(this.state.form, {
            [inputIdentifier]: updatedFormElement,
        });

        let formIsValid = true;
        for (let key in updatedForm) {
            formIsValid = updatedForm[key].valid && formIsValid;
        }

        //Custom section for search type
        if (inputIdentifier === "search_type") {
            formIsValid = false;
        }
        for (let key in updatedForm) {
            if (key !== "search_type" && inputIdentifier === "search_type") {
                updatedForm[key].visible = key === event.target.value ? true : false;
                updatedForm[key].value = key === inputIdentifier ? event.target.value : "";
            }
            if (key !== inputIdentifier) updatedForm[key].valid = true;
        }

        this.setState({ form: updatedForm, formIsValid: formIsValid });
    };

    onSearchHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.form) {
            formData[formElementIdentifier] = this.state.form[formElementIdentifier].value;
        }

        axios
            .post("/customers/searchWithType", formData)
            .then((response) => {
                const customers = response.data;
                this.setState({ customers: customers, error: false });
            })
            .catch((error) => {
                this.setState({ error: true });
                console.log(error);
            });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key],
            });
        }

        let form = (
            <form onSubmit={this.onSearchHandler}>
                {formElementsArray.map((formElement) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        errormessage={formElement.config.errormessage}
                        touched={formElement.config.touched}
                        visible={formElement.config.visible}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>
                    Search
                </Button>
            </form>
        );

        let customers = this.state.error ? <p style={{ textAlign: "center" }}> Something went wrong</p> : <Spinner />;
        if (this.state.customers) {
            customers = this.state.customers.map((customer, idx) => {
                return (
                    <tr key={idx}>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.ip}</td>
                        <td>
                            {customer.latitude} {customer.longitude}
                        </td>
                        <td>{customer.created_at}</td>
                        <td>{customer.updated_at}</td>
                    </tr>
                );
            });
            customers = (
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>IP Address</th>
                            <th>Latitude, Longitude</th>
                            <th>Created Date</th>
                            <th>Updated Date</th>
                        </tr>
                    </thead>
                    <tbody>{customers}</tbody>
                </table>
            );
        }

        return (
            <div className={classes.Customers}>
                {form}
                {customers}
            </div>
        );
    }
}

export default Customers;
