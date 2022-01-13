import {
  Avatar,
  Button,
  Chip,
  Container,
  Grid,
  InputLabel,
  Paper,
  TextField,
  makeStyles,
} from "@material-ui/core";
import React, { useState, useCallback } from "react";
import dayjs from "dayjs";

import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";

import { IFacility } from "../models/IFacility";

import { useForm } from "react-hook-form";

const initFacility: IFacility = {
  id: "",
  name: "name の初期値",
  note: "note の初期値",
  system: {
    createDate: new Date(),
    createUser: {
      displayName: "ebihara kenji",
      email: "",
      face: "https://bit.ly/3pM3urc",
    },
    lastUpdateUser: {
      displayName: "ebihara kenji",
      email: "",
      face: "https://bit.ly/3pM3urc",
    },
    lastUpdate: new Date(),
  },
};

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
  const [facility, setFacility] = useState(initFacility);
  const { system } = initFacility;

  const { register, errors } = useForm({
    defaultValues: initFacility,
    mode: "onBlur",
  });

  const onNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFacility: IFacility = {
        ...facility,
        name: e.target.value,
      };
      setFacility(newFacility);
    },
    [facility]
  );
  return (
    <Container maxWidth="sm" className={style.root}>
      <input ref={register({ required: true })} name="name" />
      <p>{errors.name ? "必須です" : ""}</p>
      <Paper className={style.paper}>
        <TextField
          label="設備名"
          fullWidth
          value={facility.name}
          onChange={onNameChange}
        />
        <TextField label="詳細" fullWidth multiline value={facility.note} />
        <InputLabel shrink>登録者</InputLabel>
        <p>
          <Chip
            label={system.createUser.displayName}
            avatar={<Avatar src={system.createUser.face} />}
          />
          {dayjs(system.createDate).format("YYYY-MM-DD-HH")}
        </p>
        <InputLabel shrink>更新者</InputLabel>
        <p>
          <Chip
            label={system.lastUpdateUser.displayName}
            avatar={<Avatar src={system.lastUpdateUser.face} />}
          />
          {dayjs(new Date()).format("YYYY-MM-DD-HH")}
        </p>
        <Grid container>
          <Grid item xs={6}>
            <Button className={style.cancelButton} startIcon={<DeleteIcon />}>
              削除
            </Button>
          </Grid>
          <Grid item xs={6} className={style.rightActions}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneIcon />}
            >
              保存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
