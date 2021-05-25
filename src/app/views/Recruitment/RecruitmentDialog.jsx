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
} from "./RecruitmentService";
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

class RecruitmentDialog extends Component {
    state = {
        id: "",
        viTriTD: "",
        soL: "",
        thoiGianBC: "",
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
        var checkTime = new Date() <= (this.state.thoiGianBC);

        if (id.length > 0) {
            if (checkTime) {
                updateItem({
                    ...this.state,
                }).then(() => {
                    toast.success(t("general.updateSuccess"));
                    this.props.handleOKEditClose();
                });
            } else {
                if (!checkTime) toast.error("Thời gian báo cáo phải sau thời gian hiện tại");
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
            viTriTD,
            soL,
            thoiGianBC,
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
                                            {t("general.position")}
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="viTriTD"
                                    value={viTriTD}
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
                                            {t("general.quantityRecruit")}
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="soL"
                                    value={soL}
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
                                        label="Thời gian báo cáo"
                                        inputVariant="standard"
                                        type="text"
                                        autoOk={true}
                                        value={thoiGianBC}
                                        onChange={date => this.handleDateChange(date, "thoiGianBC")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        validators={["required"]}
                                        errorMessages={["this field is required"]}
                                    />
                                </MuiPickersUtilsProvider>
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

export default RecruitmentDialog;
