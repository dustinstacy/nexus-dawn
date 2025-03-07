"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Button, TextInput } from "@components";
import { FormData, Register } from "@interfaces";
import { useUserStore } from "@stores";

import { sendAuthRequest, sendPasswordResetRequest } from "./api";
import { FormFooter } from "./components";
import { toCamelCase } from "./utils";

import "./authForm.scss";

// Displays login or registration form based on the value of the register prop
const AuthForm = ({ register }: Register) => {
    const router = useRouter();

    const initialFormData = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    } as FormData;

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({});
    const [showResetModal, setShowResetModal] = useState<boolean>(false);
    const [resetEmail, setResetEmail] = useState<string>("");
    const [resetMessage, setResetMessage] = useState<string>("");

    const setUser = useUserStore((state) => state.setUser);

    // Define the form fields to be rendered based on the value of register prop
    const formFields = ["Username", "Password"];
    if (register) {
        formFields.splice(1, 0, "Email");
        formFields.splice(3, 0, "Confirm Password");
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setErrors({});
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await sendAuthRequest(formData, register);
            const { accessToken, user } = res;

            sessionStorage.setItem("accessToken", accessToken);
            setUser(user);

            if (user) {
                router.push("/");
            }
        } catch (error: any) {
            if (error.message) {
                const errorData = JSON.parse(error.message);
                setErrors(errorData);
            } else {
                console.error("Unexpected error:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    const reset = () => {
        setFormData(initialFormData);
        setLoading(false);
        setErrors({});
    };

    const handlePasswordReset = async () => {
        if (!resetEmail) return;

        try {
            await sendPasswordResetRequest(resetEmail);
            setResetMessage("If the email is registered, a reset link has been sent.");
        } catch (error: any) {
            setResetMessage("Failed to send reset email. Please try again.");
        }
    };

    useEffect(() => {
        reset();
    }, [register]);

    return (
        <div className="auth-form center">
            <form className="form center" onKeyDown={(e) => handleKeyDown(e)}>
                {formFields.map((field) => (
                    <React.Fragment key={field}>
                        <TextInput
                            label={field}
                            name={toCamelCase(field)}
                            value={formData[toCamelCase(field)] as string}
                            onChange={handleInputChange}
                            loading={loading}
                            autoFocus={field === "Username"}
                            autoComplete={field === "Password" ? "new-password" : "on"}
                        />
                        {errors[toCamelCase(field)] && <p className="error">{errors[toCamelCase(field)]}</p>}
                    </React.Fragment>
                ))}

                {!register && (
                    <p className="forgot-password" onClick={() => setShowResetModal(true)}>
                        Forgot Password?
                    </p>
                )}

                {Object.keys(errors).length > 0 && !register && <p className="error">Nope. Try Again.</p>}
                <FormFooter register={register} />
            </form>
            <Button
                label="Submit"
                type="submit"
                onClick={(e: React.MouseEvent) => handleSubmit(e)}
                disabled={loading}
            />

            {/* Password Reset Modal using div */}
            {showResetModal && (
                <div className="reset-modal">
                    <div className="reset-modal-content">
                        <h3>Reset Password</h3>
                        <TextInput
                            label="Email"
                            name="resetEmail"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            loading={false}
                        />
                        <Button label="Send Reset Link" onClick={handlePasswordReset} />
                        {resetMessage && <p className="reset-message">{resetMessage}</p>}
                        <button className="close-modal" onClick={() => setShowResetModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthForm;
