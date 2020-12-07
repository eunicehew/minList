import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const ContentWithIcon = ({ icon, text }) => (
  <Grid container item spacing={1} alignItems="flex-end">
    <Grid item>{icon}</Grid>
    <Grid item>{text}</Grid>
  </Grid>
);

const Form = ({ title, formContent, submit, button }) => {
  return (
    <Card style={{ maxWidth: "30vw" }}>
      <form className="form" noValidate autoComplete="off" onSubmit={submit}>
        <CardContent style={{ margin: "5px" }}>
          <Grid container>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            {formContent &&
              formContent.map((field) => {
                return (
                  <ContentWithIcon
                    key={field.id}
                    icon={field.icon}
                    text={field.text}
                  />
                );
              })}
            <Grid item>{button} </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

ContentWithIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.element.isRequired,
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  formContent: PropTypes.arrayOf(PropTypes.object).isRequired,
  button: PropTypes.element.isRequired,
  submit: PropTypes.func.isRequired,
};

export default Form;
