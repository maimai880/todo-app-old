import {Form} from 'react-bootstrap';

const BaseTodoForm = ({setTitle, setMemo, defaultTitle, defaultMemo, isLoading, formRef}) => {
  const onTitleChange = e => setTitle(e.target.value);
  const onMemoChange = e => setMemo(e.target.value);

  return (
    <Form id="Base-Todo-Form-Area" className="m-0" autoComplete="off" ref={formRef}>
      <Form.Group className="mb-2">
        <Form.Control type="text" placeholder="title" defaultValue={defaultTitle}
                      disabled={isLoading}
                      onChange={onTitleChange} onSelect={onTitleChange}/>
      </Form.Group>

      <Form.Group>
        <Form.Control id="Memo-Form" as="textarea" placeholder="memo"
                      defaultValue={defaultMemo} disabled={isLoading}
                      onChange={onMemoChange} onSelect={onMemoChange}/>
      </Form.Group>
    </Form>
  );
};

export default BaseTodoForm;
