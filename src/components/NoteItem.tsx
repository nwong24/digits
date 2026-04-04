import { ListGroup } from 'react-bootstrap';
import { Note } from '@/lib/validationSchemas';

const NoteItem = ({ note }: { note: Note }) => {
  const createdAt = note.createdAt ? new Date(note.createdAt).toLocaleDateString('en-US') : '';

  return (
    <ListGroup.Item>
      <p className="fw-lighter mb-1">{createdAt}</p>
      <p className="mb-0">{note.note}</p>
    </ListGroup.Item>
  );
};

export default NoteItem;
