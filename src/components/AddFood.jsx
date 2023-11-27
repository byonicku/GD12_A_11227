import { useState } from "react";
import { Card, Button, Modal, Form, Col, Row, Container, FormLabel  } from 'react-bootstrap';
import { FaPlusSquare, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "sonner";

import Appetizer from "./../assets/images/appetizer.jpg";
import MainCourse from "./../assets/images/main_course.jpg";
import Desserts from "./../assets/images/desserts.jpg";

const AddFood = () => {
    const [total_makanan, setTotalMakanan] = useState(0);
    const [list_makanan, setListMakanan] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [formData, setFormData] = useState({
        nama: "",
        kategori: "",
        harga: "",
        deskripsi: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleAdd(e) {
        e.preventDefault();

        if (formData.nama === "" || formData.kategori === "" || formData.harga === "" || formData.deskripsi === "") {
            toast.error("Semua form harus diisi!");
            return;
        }
        
        let nama = formData.nama;
        setListMakanan([...list_makanan, formData]);
        
        setTotalMakanan(total_makanan + 1);
        setFormData({ nama: "", kategori: "", harga: "", deskripsi: "" });

        toast.success("Berhasil Tambah Data Makanan " + nama + "!");
        handleCloseModal();
    }

    function handleEdit(index) {
        handleOpenModal();
        setEditIndex(index);
        setFormData(list_makanan[index]);
    }

    function handleShowEdit(e) {
        e.preventDefault();
        

        if (formData.nama === "" || formData.kategori === "" || formData.harga === "" || formData.deskripsi === "") {
            toast.error("Semua form harus diisi!");
            return;
        }

        let newList = [...list_makanan];
        newList[editIndex] = formData;
        setListMakanan(newList);
        setFormData({ nama: "", kategori: "", harga: "", deskripsi: "" });
        toast.success("Berhasil Update Data Makanan " + newList[editIndex].nama + "!");

        setEditIndex(-1);
        handleCloseModal();
    }

    function handleDelete(index) {
        const newList = [...list_makanan];

        const deleted = newList[index];
        newList.splice(index, 1);
        setListMakanan(newList);
        setTotalMakanan(total_makanan - 1);

        toast.success("Berhasil Menghapus Data Makanan " + deleted.nama + "!");
    }

    function defaultVal() {
        setFormData({
            nama: "",
            kategori: "",
            harga: "",
            deskripsi: "",
        });

        setEditIndex(-1);
    }

  return (
    <>
        <div>
            <h1 className="mt-3 mb-3 border-bottom fw-bold">Daftar Menu Makanan</h1>

            <p>
                Grand Atma saat ini memiliki{' '}
                <strong>{total_makanan}</strong> daftar menu makanan yang bisa dipesan.
            </p>

            <Button
                type="button"
                variant="success"
                className="fs-6 mb-3"
                onClick={handleOpenModal}
            >
                <FaPlusSquare/>
                {' '} Tambah Menu
            </Button>

            {list_makanan &&
                list_makanan.map((value, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center">
                    <Col lg={2} className="my-auto">
                        <Card.Img
                            variant="top"
                            src={value.kategori === 'Appetizer' ? Appetizer : value.kategori === 'Main Course' ? MainCourse : Desserts}
                            className="img-fluid rounded img-room"
                            alt="Gambar Makanan"
                        />
                    </Col>

                    <Col lg={10} className="my-auto">
                        <Container lg>
                            <h5>{value.nama}</h5>
                            <p className="border-bottom pb-lg-auto">{value.deskripsi}</p>
                            <p className="mb-2">
                                Kategori: <strong>{value.kategori}</strong> · Base Price:{' '}
                                <strong>{`Rp. ${value.harga
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}</strong>
                            </p>

                            <Button
                                variant="danger"
                                className="mt-2"
                                onClick={() => handleDelete(index)}
                            >
                                <FaTrash />
                                {' '}
                                Hapus Menu
                            </Button>
                            {' '}
                            <Button
                                variant="primary"
                                className="mt-2"
                                onClick={() => handleEdit(index)}
                            >
                                <FaEdit/>
                                {' '}
                                Edit Menu
                            </Button>
                        </Container>
                    </Col>
                    </Card.Body>
                </Card>
                ))}
        </div>

        <Modal show={showModal} onHide={handleCloseModal} onExit={defaultVal} style={{ }}>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={editIndex == -1 ? handleAdd : handleShowEdit}>
                    <Row className="mb-4">
                        <Form.Label className="my-auto">
                            Nama Makanan
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="nama"
                            defaultValue={formData.nama}
                            onChange={handleChange}
                        />
                    </Row>

                    <Row className="mb-4">
                        <Form.Label className="my-auto">
                        Kategori Makanan
                        </Form.Label>
                        <Form.Select
                            name="kategori"
                            defaultValue={formData.kategori}
                            onChange={handleChange}
                        >
                            <option value="" selected disabled hidden>
                            Pilih Kategori
                            </option>
                            <option value="Appetizer">Appetizers</option>
                            <option value="Main Course">Main Courses</option>
                            <option value="Dessert">Desserts</option>
                        </Form.Select>
                    </Row>

                    <Row className="mb-4">
                        <Form.Label className="my-auto">
                            Harga Makanan
                        </Form.Label>               
                        <Form.Control
                            type="number"
                            defaultValue={formData.harga}
                            name="harga"
                            onChange={handleChange}
                        />
                    </Row>

                    <Row className="mb-4">
                        <Form.Label className="my-auto">
                        Deskripsi Makanan
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            name="deskripsi"
                            defaultValue={formData.deskripsi}
                            onChange={handleChange}
                        />
                    </Row>

                    <Button variant="primary" type="submit">
                        {' '}
                        Simpan
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    </>
  );
};

export default AddFood;