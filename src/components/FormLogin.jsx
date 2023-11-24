import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { toast } from "sonner";

function FormLogin() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", password: "" });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.username === "" && user.password === "") {
            toast.error("Username and Password tidak boleh kosong");
            return;
        } else {
            const newUser = {
                ...user,
                loginAt: new Date(),
            };

            localStorage.setItem("user", JSON.stringify(newUser));
            toast.success("Login Berhasil");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        }
    }
    
  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "auto" }}>
        <Alert variant="info">
            <strong>Info!</strong> Username dan password bebas, yang penting diisi.
        </Alert>
        <FloatingLabel controlId="floatinInput" label="Username" className="mb-3">
            <Form.Control type="text" placeholder="name@example.com" name="username" onChange={handleChange}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatinInput" label="Password" className="mb-3">
            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} autoComplete="off"/>
        </FloatingLabel>
        <Button variant="primary" type="submit" className="mt-3 w-100">
            Login
        </Button>
    </Form>
  );
}

export default FormLogin;