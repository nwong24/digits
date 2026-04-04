'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema } from '@/lib/validationSchemas';

type AddNoteFormProps = {
  contactId: number;
};

type AddNoteData = {
  note: string;
  contactId: number;
  owner: string;
};

const onSubmit = async (data: AddNoteData, reset: () => void) => {
  await addNote(data);
  reset();
  swal('Success', 'Your note has been added', 'success', {
    timer: 2000,
  });
};

const AddNoteForm = ({ contactId }: AddNoteFormProps) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddNoteData>({
    resolver: yupResolver(AddNoteSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Card className="mt-3">
      <Card.Header className="text-center">Add Timestamped Note</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit((data) => onSubmit(data, () => reset()))}>
          <Form.Group className="mb-3">
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              {...register('note')}
              className={errors.note ? 'is-invalid' : ''}
            />
            <div className="invalid-feedback">{errors.note?.message}</div>
          </Form.Group>
          <input type="hidden" {...register('owner')} value={currentUser} />
          <input type="hidden" {...register('contactId')} value={contactId} />
          <Row>
            <Col>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Col>
            <Col className="text-end">
              <Button type="button" variant="warning" onClick={() => reset()}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNoteForm;
