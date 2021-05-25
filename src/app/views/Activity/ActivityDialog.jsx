import React, { Component } from "react";
import {
    Dialog,
    Button,
    Grid,
    DialogActions,
    FormControl,
    Paper,
    DialogTitle,
    DialogContent,
} from "@material-ui/core";
// import Paper from '@material-ui/core/Paper'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Draggable from "react-draggable";
import NotificationPopup from "../Component/NotificationPopup/NotificationPopup";
import {
    saveItem,
    addItem,
    updateItem,
    checkCode,
} from "./ActivityService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

class ActivityDialog extends Component {
    state = {
        id: "",
        ten: "",
        thoiGianBD: "",
        thoiGianKT: "",
        chiPhi: "",
        chiPhiDC: "",
        ghiChu: "",
        status: "",
        shouldOpenNotificationPopup: false,
        Notification: "",
    };

    handleDialogClose = () => {
        this.setState({ shouldOpenNotificationPopup: false });
    };

    handleChange = (event, source) => {
        event.persist();
        if (source === "switch") {
            this.setState({ isActive: event.target.checked });
            return;
        }
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleFormSubmit = () => {
        let { id } = this.state;
        var { t } = this.props;
        var checkTime = moment(this.state.thoiGianBD).isBefore(this.state.thoiGianKT);
        var checkTime2 = new Date() <= (this.state.thoiGianKT);

        if (id.length > 0) {
            if (checkTime && checkTime2) {
                updateItem({
                    ...this.state,
                }).then(() => {
                    toast.success(t("general.updateSuccess"));
                    this.props.handleOKEditClose();
                });
            } else {
                if (!checkTime) toast.error("Thời gian bắt đầu phải trước thời gian kết thúc");
                if (!checkTime2) toast.error("Thời gian kết thúc phải sau thời gian hiện tại");
            }
        } else {
            saveItem({
                ...this.state,
            }).then(() => {
                toast.success(t("general.addSuccess"));
                this.props.handleOKEditClose();
            });
        }
    };

    handleDateChange = (date, name) => {
        this.setState({
            [name]: date

        });
    }

    componentWillMount() {
        //getUserById(this.props.uid).then(data => this.setState({ ...data.data }));
        let { open, handleClose, item } = this.props;
        this.setState({ ...item });
    }

    render() {
        let {
            id,
            ten,
            thoiGianBD,
            thoiGianKT,
            chiPhi,
            chiPhiDC,
            ghiChu,
            status,
            shouldOpenNotificationPopup,
        } = this.state;
        let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
        return (
            <Dialog
                open={open}
                PaperComponent={PaperComponent}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle
                    style={{ cursor: "move", paddingBottom: "0px" }}
                    id="draggable-dialog-title"
                >
                    <h4 className="">{id ? t("general.update") : t("general.addNew")}</h4>
                </DialogTitle>

                <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <DialogContent>
                        <Grid className="" container spacing={2}>
                            <Grid item sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 "
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}>*</span>
                                            {t("general.name")}
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="ten"
                                    value={ten}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>

                            <Grid item sm={6} xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        width="100%"
                                        margin="none"
                                        id="mui-pickers-date"
                                        format="dd/MM/yyyy"
                                        label="Ngày bắt đầu"
                                        inputVariant="standard"
                                        type="text"
                                        autoOk={true}
                                        value={thoiGianBD}
                                        onChange={date => this.handleDateChange(date, "thoiGianBD")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />
                                </MuiPickersUtilsProvider></Grid>
                            <Grid item sm={6} xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="none"
                                        id="mui-pickers-date"
                                        format="dd/MM/yyyy"
                                        label="Ngày kết thúc"
                                        inputVariant="standard"
                                        type="text"
                                        autoOk={true}
                                        value={thoiGianKT}
                                        onChange={date => this.handleDateChange(date, "thoiGianKT")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />

                                </MuiPickersUtilsProvider>
                            </Grid>

                            <Grid item sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 "
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}>*</span>
                                            {t("general.cost")}
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="chiPhi"
                                    value={chiPhi}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>

                            <Grid item sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 "
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}>*</span>
                                            {t("general.costProvided")}
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="chiPhiDC"
                                    value={chiPhiDC}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>

                            <Grid item sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 "
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}>*</span>
                                            {t("general.note")}
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="ghiChu"
                                    value={ghiChu}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>

                            <Grid item sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 "
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}>*</span>
                                            {t("general.status")}
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="status"
                                    value={status}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <div className="flex flex-space-between flex-middle mt-12">
                            <Button
                                variant="contained"
                                className="mr-12"
                                color="secondary"
                                onClick={() => this.props.handleClose()}
                            >
                                {t("general.cancel")}
                            </Button>
                            <Button
                                variant="contained"
                                style={{ marginRight: "15px" }}
                                color="primary"
                                type="submit"
                            >
                                {t("general.save")}
                            </Button>
                        </div>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}

export default ActivityDialog;
