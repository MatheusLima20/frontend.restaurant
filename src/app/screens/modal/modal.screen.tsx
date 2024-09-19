import { Button, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  title: string;
  body: JSX.Element;
}

export const CenterModal = (props: Props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100" style={{ textAlign: "center" }}>
          <div className="row">
            <p className="text-center">{props.title}</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
