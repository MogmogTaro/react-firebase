import {
  Avatar,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { IReservation } from "../models/IReservation";

import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";

import { DateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { IFacility } from "../models/IFacility";

const dummyFacilities: IFacility[] = [
  {
    id: "01",
    name: "設備００１",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: "",
  },
  {
    id: "02",
    name: "設備００２",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: "",
  },
  {
    id: "03",
    name: "設備００３",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: "",
  },
];

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
  paper: {
    padding: theme.spacing(1),
    "& > div": {
      marginBottom: theme.spacing(2),
    },
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

  const [facilities, setFacilities] = useState<IFacility[]>(dummyFacilities);
  const facilityMenuItems = useMemo(() => {
    return facilities.map((f) => (
      <MenuItem key={f.id} value={f.id}>
        {f.name}
      </MenuItem>
    ));
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper className={style.paper}>
        <FormControl>
          <InputLabel id="facility-label">設備</InputLabel>

          <Controller
            name="facilityId"
            control={control}
            render={({ value, onChange }) => (
              <Select
                labelId="facility-label"
                value={value}
                onChange={onChange}
              >
                {facilityMenuItems}
              </Select>
            )}
          />
        </FormControl>

        <div style={{ display: "flex" }}>
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
        </div>
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
