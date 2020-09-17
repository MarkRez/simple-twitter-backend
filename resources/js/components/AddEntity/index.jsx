import React, {useState} from "react";
import Button from "../Button";
import './addEntity.scss'
import Skeleton from "react-loading-skeleton";
import DropdownInput from "../DropdownInput";

const AddEntity = (
  {
    addFunc,
    getTagsFunc,
    rows = 2,
    type = "",
    loading = false,
    placeholder,
    tagsList,
    showTagsInput = false
  }) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [tags, setTags] = useState([]);

  const handleClickAdd = (e) => {
    e.preventDefault();
    if (textAreaValue) {
      addFunc(textAreaValue, tags);
      setTextAreaValue('');
      setTags([]);
    }
  }

  const handleTextAreaChange = (e) => {
    e.preventDefault();
    setTextAreaValue(e.target.value);
  }

  const addTag = (id) => {
    for (let i = 0; i < tagsList.length; i += 1) {
      if (tagsList[i].id === id) {
        let exist = false;
        tags.forEach(tag => {
          if (tag.id === id) {
            exist = true;
          }
        })
        !exist && setTags([...tags, tagsList[i]]);
        break;
      }
    }
  }

  const deleteTag = (id) => {
    const withoutDeleted = tags.filter(tag => tag.id !== id);
    setTags(withoutDeleted);
  }

  return (
    <div className="add-entity w-100">
      <div className="row px-2">
        <div className="col-lg-12 text-aria-div">
          {type
            ? <textarea
              className="w-100 mb-2"
              rows={rows}
              onChange={handleTextAreaChange}
              value={textAreaValue}
              placeholder={placeholder}
            />
            : <Skeleton height={40}/>
          }
        </div>
        {showTagsInput &&
        <>
          {
            tags.length < 3 &&
            <div className="col-lg-6 tags-dropdown-div">
              <DropdownInput onChangeFunc={getTagsFunc} onClickFunc={addTag} items={tagsList}/>
            </div>
          }
          <div className="col-lg-6 tags-div">
            {tags.map((tag, i) =>
                <span key={`tag ${i}`} className="tag">
              {tag.name}
                  <span onClick={() => deleteTag(tag.id)}> &times;</span>
            </span>
            )}
          </div>
        </>
        }
        <div className="col-lg-12 button-div text-right">
          {type
            ? <Button onClickFunc={handleClickAdd} style="add">Add {type}</Button>
            : <Skeleton height={35} width={100}/>}
        </div>

      </div>
    </div>
  )
};

export default AddEntity;
