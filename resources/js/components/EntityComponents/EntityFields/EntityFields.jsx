import React from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Button} from "../../UI";
import {DropdownInput} from "../../UI/Inputs";
import './entityFields.scss';

const entitySchema = Yup.object({text: Yup.string().required('Required')});

export const EntityFields = (
  {
    onTextChange,
    onSubmitClick,
    getDropdownTags,
    setTags,
    text = '',
    currentTags = [],
    dropdownTags,
    type = '',
    rows = 4,
    placeholder,
    buttonText = 'Add'
  }) => {
  const handleTextAreaChange = (e) => {
    e.preventDefault();
    onTextChange(e.target.value);
  }

  const addTag = (id) => {
    const tag = dropdownTags.find((t) => t.id === id);
    const isExists = !!currentTags.find((t) => t.id === id);
    if (tag && !isExists) {
      setTags([...currentTags, tag]);
    }
  }

  const deleteTag = (e, id) => {
    e.preventDefault();
    const withoutDeleted = currentTags.filter(tag => tag.id !== id);
    setTags(withoutDeleted);
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{text: text}}
      validationSchema={entitySchema}
      onSubmit={() => {
        onSubmitClick();
      }}
    >
      {({errors, touched}) => (
        <Form noValidate className="w-100">
          <div className="row entity-fields pl-2 w-100">
            <div className="col-lg-12 textarea-div mb-2">
              <Field
                name="text"
                as="textarea"
                type="text"
                className="form-control"
                id="name"
                placeholder={placeholder}
                rows={rows}
                onChange={handleTextAreaChange}
              />
            </div>
            {
              type === "post"
                ? <>
                  {currentTags.length < 3 &&
                  <div className="col-lg-6 tags-dropdown-div">
                    <DropdownInput handleChange={getDropdownTags} handleClick={addTag} items={(dropdownTags || []).filter(t => !currentTags.map(c => c.id).includes(t.id))}/>
                  </div>
                  }
                  <div className="col-lg-6 tags-div pt-1">
                    {currentTags.map((tag, i) =>
                        <span key={`tag ${i}`} className="tag py-2 px-3 mr-2 mt-1">
                    {tag.name}
                          <span onClick={(e) => deleteTag(e, tag.id)}> &times;</span>
            </span>
                    )}
                  </div>
                </>
                : null
            }
            <div className="col-lg-12 text-right">
              <Button type="submit" btnClassName='add'>{buttonText}</Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
