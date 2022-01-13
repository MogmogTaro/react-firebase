import {
  Avatar,
  Button,
  Chip,
  Container,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { IReservation } from "../models/IReservation";

import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";

import { DateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const initReservation: IReservation = {
  id: "001",
  facilityId: "001",
  subject: "目的０１",
  description: "説明００１",
  startDate: dayjs(),
  endDate: dayjs().add(1, "hour"),
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

export const Reservation = () => {
  const style = useStyle();
  const { system } = initReservation;

  const { errors, control } = useForm<IReservation>({
    defaultValues: initReservation,
    mode: "onBlur",
  });

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const onDateChange = useCallback((date: MaterialUiPickersDate) => {
    setDate(date);
  }, []);

  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <Controller
          control={control}
          name="startDate"
          render={(data) => {
            return (
              <DateTimePicker
                value={data.value}
                onChange={data.onChange}
                onBlur={data.onBlur}
                label="開始日時"
                format="YYYY/MM/DD HH:mm"
                ampm={false}
                minutesStep={15}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="endDate"
          render={(data) => {
            return (
              <DateTimePicker
                value={data.value}
                onChange={data.onChange}
                onBlur={data.onBlur}
                label="終了日時"
                format="YYYY/MM/DD HH:mm"
                ampm={false}
                minutesStep={15}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="subject"
          rules={{ required: true }}
          as={
            <TextField
              label="目的"
              fullWidth
              error={!!errors.subject}
              helperText={errors.subject ? "必須です" : ""}
            />
          }
        />

        <Controller
          control={control}
          name="description"
          rules={{ required: true }}
          as={
            <TextField
              label="詳細"
              fullWidth
              multiline
              error={!!errors.description}
              helperText={errors.description ? "必須です" : ""}
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
