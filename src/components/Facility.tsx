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

import { Controller, useForm } from "react-hook-form";

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
  const { system } = initFacility;

  const { register, errors, control } = useForm({
    defaultValues: initFacility,
    mode: "onBlur",
  });

  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          as={
            <TextField
              label="設備名"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? "必須です" : ""}
            />
          }
        />

        <Controller
          control={control}
          name="note"
          rules={{ required: true }}
          as={
            <TextField
              label="詳細"
              fullWidth
              multiline
              error={!!errors.note}
              helperText={errors.note ? "必須です" : ""}
            />
          }
        />

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
