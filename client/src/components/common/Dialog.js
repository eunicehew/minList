import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const AddDialog = ({ header, fields, specialFields, addFunction, body }) => {
  // specialFields={[
  //   (changeFunction) => {
  //     return (
  //       <TextField
  //         margin="dense"
  //         key="Description"
  //         id="details"
  //         label="Description"
  //         fullWidth
  //         multiline
  //         required
  //         type="text"
  //         onChange={changeFunction}
  //       />
  //     );
  //   },
  // ]}
  const [open, setOpen] = useState(false);
  let state = body || {};

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //make sure this can also handle bool/checkboxes
  const handleChange = (e) => {
    state[e.target.id] = e.target.value;
  };
  // make sure all inputs are filled before submit
  const add = (e) => {
    e.preventDefault();
    let invalid = false
    for (let field of Object.values(fields)){
      if(!(field in state)){
        invalid = true;
        break;
      }
    }
    if (!invalid){
      addFunction(state);
      state = {};
      handleClose();}
  };

  return (
    <div>
      <Fab size="small" color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{header}</DialogTitle>
        <DialogContent>
          {fields && Object.keys(fields).length > 0
            ? Object.keys(fields).map((field) => {
                return (
                  <TextField
                    autoFocus
                    margin="dense"
                    key={field}
                    id={fields[field]}
                    label={field}
                    required
                    type="text"
                    onChange={handleChange}
                    // error={!(fields[field] in state)}
                    helperText={"Input required"}
                  />
                );
              })
            : null}
          {specialFields && specialFields.length > 0
            ? specialFields.map((field) => {
                return field(handleChange);
              })
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={add} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};



AddDialog.propTypes = {
  header: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  addFunction: PropTypes.func.isRequired,
  body: PropTypes.object,
};

export { AddDialog };
