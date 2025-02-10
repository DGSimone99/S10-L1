import { Component } from "react";
import SingleBook from "./SingleBook";
import { Alert, Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    selected: null,
  };

  changeSelected = (bookSelected) => this.setState({ selected: bookSelected });

  render() {
    return (
      <>
        <Row>
          <Col md={8}>
            <Row className="justify-content-center mt-5">
              <Col xs={12} md={4} className="text-center">
                <Form.Group>
                  <Form.Control
                    type="search"
                    placeholder="Cerca un libro"
                    value={this.state.searchQuery}
                    onChange={(e) => this.setState({ searchQuery: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-2 mt-3">
              {this.props.books
                .filter((b) => b.title.toLowerCase().includes(this.state.searchQuery))
                .map((b) => (
                  <Col
                    xs={12}
                    md={4}
                    key={b.asin}
                    onClick={() => this.changeSelected(b.asin)}
                    style={{ border: this.state.selected === b.asin ? "3px solid red" : "none" }}
                  >
                    <SingleBook book={b} />
                  </Col>
                ))}
            </Row>
          </Col>

          <Col md={4}>
            {this.state.selected ? (
              <CommentArea asin={this.state.selected} />
            ) : (
              <Alert variant="success" className="sticky-top">
                <Alert.Heading>Seleziona un Libro</Alert.Heading>
              </Alert>
            )}
          </Col>
        </Row>
      </>
    );
  }
}

export default BookList;
