import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { EditableListItem } from "./ListItems";
import { AddDialog } from "../Dialog.js";


const DraggableList = ({
  sheetId,
  list,
  listId,
  header,
  items,
  bottomItem,
  setBottomItem,
  editList,
  deleteList,
  moveItem,
  addItem,
  editItem,
  deleteItem,
  itemLoading,
  listIdLoading,
}) => {
  const useStyles = makeStyles((theme) => ({
    card: {
      maxHeight: "30vh",
      width: "20vw",
      position: "relative",
    },
    header: { height: "6vh" },
    content: {
      display: "flex",
      flexDirection: "column",
      height: "18vh",
      overflowY: "auto",
      padding: theme.spacing(0, 2),
    },
    item: {
      flexGrow: 1
    },
    itemSpace: {
      flexGrow: 100
    },
    footer: { height: "6vh"},
    closeButton: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    addButton: {
      position: "absolute",
      bottom: "2vh",
      right: "4vh",
    },
    hide: {
      display: "none",
    },
  }));

  const classes = useStyles();

  const onDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.style.background = "lightgray";
    // event.currentTarget.style.cursor = "grabbing";
  };

  const onDrop = (event) => {
    event.preventDefault();
    event.currentTarget.style.background = "";

  };

  const onDragLeave = (event) => {
    event.currentTarget.style.background = "";
  };

  const onDragOverItem = (event) => {
    event.preventDefault();
    event.currentTarget.style.background = "lightblue";
  };

  const onDropItem = (event, item) => {
    event.preventDefault();
    if (item !== bottomItem) {
      bottomItem = item;
      setBottomItem(item);
    }
    let itemId = event.dataTransfer.getData("item");
    let body = { listId, itemId, items, bottomItem};
    moveItem(body);
  };

  const onDragLeaveItem = (event) => {
    event.currentTarget.style.background = "";
  };

  return (
    <Card
      className={classes.card}
      onDragOver={(event) => onDragOver(event)}
      onDrop={(event) => onDrop(event)}
      onDragLeave={(event) => onDragLeave(event)}
    >
      <CardHeader
        className={classes.header}
        onDrop={(event)=>onDropItem(event, 0)}
        title={
          <EditableListItem
            item={list}
            editFunction={(inputText) =>
              editList({
                id: listId,
                pageId: sheetId,
                name: inputText,
              })
            }
            deleteFunction={() => deleteList(listId)}
            customOnNotEditClick={<Typography variant="h5">{header}</Typography>}
          />
        }
        action={
          <IconButton
            className={classes.closeButton}
            aria-label="delete"
            onClick={() => deleteList({ listId, pageId: sheetId })}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent className={classes.content} >
        <List className={classes.content}>
          {items && items.length > 0 ? (
            <>
            {items.map((item) => {
              return (
                <div key={item._id} className={classes.item}>
                  {itemLoading && listIdLoading.includes(listId) ? (
                    <CircularProgress />
                  ) : (
                    <EditableListItem
                      draggableItem
                      item={item}
                      deleteFunction={() =>
                        deleteItem({ listId, itemId: item._id })
                      }
                      deleteIcon={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            deleteItem({ listId, itemId: item._id })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                      editFunction={(inputText) =>
                        editItem({ id: item._id, name: inputText, listId })
                      }
                      onDragOver={(event) => onDragOverItem(event)}
                      onDrop={(event)=>onDropItem(event, item._id)}
                      onDragLeave={(event) => onDragLeaveItem(event)}
                    />
                  )}
                </div>
              )})}
              
            <div className={classes.itemSpace} onDrop={(event)=>onDropItem(event, items.length)}/>
            </>
            
          ) : (
            <Typography 
              align="center" 
              variant="h6" 
              className={classes.content}
              onDrop={(event)=>onDropItem(event, 0)}
            >
              No items
            </Typography>
          )}
        </List>
      </CardContent>

      <CardActions className={classes.footer} onDrop={(event)=>onDropItem(event, items.length)}>
        <div className={classes.addButton}>
          <AddDialog
            header="Add Item"
            fields={{ "Item Name": "name" }}
            addFunction={addItem}
            body={{ listId: listId, sheetId: sheetId }}
          />
        </div>
      </CardActions>
    </Card>
  );
};

DraggableList.propTypes = {
  sheetId: PropTypes.string.isRequired,
  list: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    sheets: PropTypes.array,
    items: PropTypes.array,
  }).isRequired,
  listId: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      subItems: PropTypes.array.isRequired,
    })
  ).isRequired,
  itemLoading: PropTypes.bool.isRequired,
  listIdLoading: PropTypes.arrayOf(PropTypes.string).isRequired,

  editList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export { DraggableList };
