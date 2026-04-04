"use client";

import { Card, ListGroup } from 'react-bootstrap';
import { Contact, Note } from '@/lib/validationSchemas';
import NoteItem from '@/components/NoteItem';

interface Props {
  contact: Contact;
  notes: Note[];
}

const ContactCardAdmin = ({ contact, notes }: Props) => (
  <Card className="h-100">
    <Card.Header className="d-flex align-items-center gap-3">
      <Card.Img
        src={contact.image}
        style={{ width: '75px', height: '75px', objectFit: 'cover' }}
      />
      <div>
        <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
        <Card.Subtitle className="text-muted">{contact.address}</Card.Subtitle>
      </div>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <ListGroup variant="flush" className="mt-3">
        {notes.map((note) => <NoteItem key={note.id} note={note} />)}
      </ListGroup>
      <p className="blockquote-footer mb-0">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
