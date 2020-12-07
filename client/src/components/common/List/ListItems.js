import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";

const onMouseOver = (event) => {
  event.currentTarget.style.cursor = "grab";
};

const onDragStart = (event, item) => {
  // event.currentTarget.style.border = "dashed";
  event.currentTarget.style.border = "thin solid red";
  event.dataTransfer.setData("item", item);

  event.dataTransfer.effectAllowed = "move";
  // event.currentTarget.style.cursor = "grabbing";
};

const onDragEnd = (event) => {
  event.currentTarget.style.border = "";
  event.currentTarget.style.background = "";
  // event.currentTarget.style.cursor = "default";
};

const DraggableListItem = ({ item, listId, deleteItem }) => {
  return (
    <ListItem
      draggable
      onMouseOver={(event) => onMouseOver(event)}
      onDragStart={(event) => onDragStart(event, item._id)}
      onDragEnd={(event) => onDragEnd(event)}
    >
      <ListItemText primary={item.name} />
      <Divider orientation="vertical" flexItem />
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => deleteItem({ listId, itemId: item._id })}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

const EditableListItem = ({
  draggableItem,
  item,
  editFunction,
  deleteFunction,
  deleteIcon,
  customOnNotEdit,
  customOnNotEditClick,
  pathname,
  handleRedirect,
  editMode,
  onDragOver,
  onDrop,
  onDragLeave,
}) => {
  function useKeypress(targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
      const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
  }

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }
  const [editClicked, setEditClicked] = useState(false);
  const [inputText, setInputText] = useState(item.name);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  useOnClickOutside(wrapperRef, () => {
    if ((editClicked || editMode) && inputText !== item.name) {
      if (inputText === "") {
        deleteFunction();
      } else {
        editFunction(inputText);
      }
      if (editMode && pathname === `/${item.name}`) {
        handleRedirect(inputText);
      }
    }
    setEditClicked(false);
  });

  const onEnter = useCallback(() => {
    if (enter) {
      if (inputText !== item.name) {
        if (inputText === "") {
          deleteFunction();
        } else {
          editFunction(inputText);
        }
        if (editMode && pathname === `/${item.name}`) {
          handleRedirect(inputText);
        }
      }
      setEditClicked(false);
    }
  }, [enter, inputText]);

  const onEsc = useCallback(() => {
    if (esc) {
      setInputText(item.name);
      setEditClicked(false);
    }
  }, [esc, item.name]);

  useEffect(() => {
    onEnter();
    onEsc();
  }, [onEnter, onEsc]);

  return editClicked || editMode ? (
    <ListItem button key={item._id} ref={wrapperRef}>
      <ListItemText
        primary={
          <Input
            value={inputText}
            ref={inputRef}
            autoFocus
            onFocus={e => e.currentTarget.select()}
            onChange={(e) => setInputText(e.target.value)}
          />
        }
      />
      {deleteIcon || null}
    </ListItem>
  ) : customOnNotEdit ? (
      <>{customOnNotEdit}</>
    ) : customOnNotEditClick ? (
      <div onClick={() => setEditClicked(true)}>
        {customOnNotEditClick}
      </div>
      ) : draggableItem ? (
        <ListItem
          draggable
          onMouseOver={(event) => onMouseOver(event)}
          onDragStart={(event) => onDragStart(event, item._id)}
          onDragEnd={(event) => onDragEnd(event)}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragLeave={onDragLeave}
        >
          <ListItemText
            primary={item.name}
            onClick={() => setEditClicked(true)}
          />
        </ListItem>
      ) : pathname ? (
        <ListItem button onClick={() => handleRedirect(item)}>
          <ListItemText primary={item.name}/>    
        </ListItem>
        ) : (    
          <ListItem button onClick={() => setEditClicked(true)}>
            <ListItemText primary={item.name}/>
          </ListItem>
          );
};


DraggableListItem.propTypes = {
  listId: PropTypes.string.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subItems: PropTypes.array.isRequired,
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

EditableListItem.propTypes = {
  draggableItem: PropTypes.bool,
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subItems: PropTypes.array,
  }).isRequired,
  deleteIcon: PropTypes.node,
  customOnNotEdit: PropTypes.node,
  customOnNotEditClick: PropTypes.node,
  pathname: PropTypes.string,
  editMode: PropTypes.bool,

  editFunction: PropTypes.func.isRequired,
  deleteFunction: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  onDragLeave: PropTypes.func
};

export { DraggableListItem, EditableListItem };
