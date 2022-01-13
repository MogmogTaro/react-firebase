import {
  Avatar,
  Button,
  Chip,
  Container,
  Grid,
  InputLabel,
  Paper,
  TextField,
} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import dayjs from "dayjs";

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
  rightActions: {
    textAlign: "right",
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

export const Facility: React.FC = () => {
  const style = useStyle();
  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <TextField label="設備名" fullWidth />
        <TextField label="詳細" fullWidth multiline />
        <InputLabel shrink>登録者</InputLabel>
        <p>
          <Chip
            label="登録者"
            avatar={<Avatar src="https://bit.ly/3pM3urc" />}
          />
          {dayjs(new Date()).format("YYYY-MM-DD-HH")}
        </p>
        <p>
          <Chip
            label="更新者"
            avatar={<Avatar src="https://bit.ly/3pM3urc" />}
          />
          {dayjs(new Date()).format("YYYY-MM-DD-HH")}
        </p>
        <Grid container>
          <Grid item xs={6}>
            <Button variant="contained" className={style.cancelButton}>
              削除
            </Button>
          </Grid>
          <Grid item xs={6} className={style.rightActions}>
            <Button variant="contained" color="primary">
              保存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
