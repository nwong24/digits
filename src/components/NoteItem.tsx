import { ListGroup } from 'react-bootstrap';
import { Note } from '@/lib/validationSchemas';

const NoteItem = ({ note, showOwner = false }: { note: Note; showOwner?: boolean }) => {
  const createdAt = note.createdAt ? new Date(note.createdAt).toLocaleDateString('en-US') : '';

  return (
    <ListGroup.Item>
      <p className="fw-lighter mb-1">{createdAt}</p>
      <p className="mb-0">{note.note}</p>
      {showOwner ? <small className="d-block mt-2 text-body-secondary">Note owner: {note.owner}</small> : null}
    </ListGroup.Item>
  );
};

export default NoteItem;
