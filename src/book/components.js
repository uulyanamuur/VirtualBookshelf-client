import {Col, Row, Button} from "react-bootstrap";

export default function Book(props) {
  const {book} = props;
  const toogleButtonText = book.finished ? "В процессе" : "Закончить";
  return (
    <div>
      <Row>
        <Col lg={5} sm={12}>
          Название:
        </Col>
        <Col lg={5} sm={12}>
          {book.title}
        </Col>
      </Row>
      <Row>
        <Col lg={5} sm={12}>
         Автор:
        </Col>
        <Col lg={5} sm={12}>
          {book.author}
        </Col>
      </Row>
      <Row>
        <Col lg={5} sm={12}>
          Дата начала:
        </Col>
        <Col lg={5} sm={12}>
          {book.year}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={6} sm={12} className="p-1 d-grid">
          <Button variant="primary"
                  onClick={() => props.handleToggleBook(book)}>
            {toogleButtonText}
          </Button>
        </Col>
        <Col lg={6} sm={12} className="p-1 d-grid">
          <Button variant="danger"
                  onClick={() => props.handleDeleteBook(book)}>
            Удалить
          </Button>
        </Col>
      </Row>
    </div>
  )
}