"use client";

import Link from 'next/link';
import { Card, ListGroup } from 'react-bootstrap';
import { Contact, Note } from '@/lib/validationSchemas';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';

interface Props {
  contact: Contact;
  notes: Note[];
}

const ContactCard = ({ contact, notes }: Props) => (
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
    </Card.Body>
    <Card.Footer>
      <Link href={`/edit/${contact.id}`}>Edit</Link>
      <ListGroup variant="flush">
        {notes.map((note) => <NoteItem key={note.id} note={note} />)}
      </ListGroup>
      <AddNoteForm contactId={contact.id!} />
    </Card.Footer>
  </Card>
);

export default ContactCard;
