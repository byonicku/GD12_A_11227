import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import AddFood from "../components/AddFood";

function DashboardPage() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    const formatDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(date).toLocaleDateString("id-ID", options);
    }

  return (
    <Container className="mt-5">
        <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
        <Row className="mb-4">
            <Col md={10}>
                <Card className="h-100 justify-content-center">
                    <Card.Body>
                        <h4>Selamat datang,</h4>
                        <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
                        <p className="mb-0">Kamu sudah login sejak:</p>
                        <p className="mb-0 fw-bold lead">{formatDate(user?.loginAt)}</p>                        
                    </Card.Body>
                </Card>
            </Col>
            <Col md={2}>
                <Card>
                    <Card.Body>
                        <p>Bukti sedang ngantor:</p>
                        <img src="https://via.placeholder.com/150" alt="Tidak ada gambar" className="img-fluid rounded" />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <AddFood />
    </Container>
  )
}

export default DashboardPage