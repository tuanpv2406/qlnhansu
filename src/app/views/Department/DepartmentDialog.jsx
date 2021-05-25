import {
  Grid,
  DialogActions,
  Button,
  Dialog,
} from '@material-ui/core';
import React from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Draggable from 'react-draggable'
import NotificationPopup from '../Component/NotificationPopup/NotificationPopup'
import {
  getAllPhongBan
} from './DepartmentService'
import Paper from '@material-ui/core/Paper'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3
  //etc you get the idea
});
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}
class DepartmentDialog extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  state = {
    id: '',
    rowsPerPage: 5,
    page: 0,
    data: [],
    totalElements: 0,
    itemList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    shouldOpenDepartmentPopup: false,
    shouldOpenNotificationPopup: false,
    selectedItem: {},
    type: 0,
    keyword: '',
    Notification: "",
    isAssetManagement: false,
    viewIndex: 0,
    ten: "",
    soLuongNV: "",
    status: ""
  }

  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData()
    })
  }

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 })
    this.updatePageData()
  }

  handleChangePage = (event, newPage) => {
    this.setPage(newPage)
  }

  updatePageData = () => {
    var searchObject = {}
    searchObject.keyword = ''
    searchObject.pageIndex = this.state.page + 1
    searchObject.pageSize = this.state.rowsPerPage
    getAllPhongBan(this.state.page, this.state.rowsPerPage).then(({ data }) => {
      this.setState({
        itemList: [...data.content],
        totalElements: data.totalElements,
      })
    })
  }

  componentDidMount() {
    this.updatePageData()
  }
  handleFormSubmit = () => {
    getAllPhongBan({ ...this.state }).then(() => {
      this.props.handleClose()
    })
  }

handleClick = (event, item) => {
  //alert(item);
  if (item.id != null) {
    this.setState({ selectedValue: item.id, selectedItem: item })
  } else {
    this.setState({ selectedValue: item.id, selectedItem: null })
  }
}
componentWillMount() {
  const { item } = this.props
  this.setState(
    {
      item: item
    }, () => {
      console.log(this.state.item)
    }
  )
  this.setState(
    {
      ...this.props.item,
    }
  )
}

handleChange(event, source) {
  // debugger
  if (source === 'isAssetManagement') {
    this.setState({ isAssetManagement: event.target.checked })
    return
  }
  this.setState({
    [event.target.name]: event.target.value,
  })
}

handleDateChange = (date) => {
  this.setState({ foundedDate: date })
}

handleDepartmentPopupClose = () => {
  this.setState({
    shouldOpenDepartmentPopup: false,
  })
}

handleDialogClose = () => {
  this.setState({ shouldOpenNotificationPopup: false, })
}
render() {
  const {
    t,
    open,
  } = this.props
  let {
    ten,
    soLuongNV,
    status,
    shouldOpenNotificationPopup
  } = this.state

  return (
    <Dialog open={open} PaperComponent={PaperComponent}>
      {shouldOpenNotificationPopup && (
        <NotificationPopup
          title={"Thông báo"}
          open={shouldOpenNotificationPopup}
          // onConfirmDialogClose={this.handleDialogClose}
          onYesClick={this.handleDialogClose}
          text={t(this.state.Notification)}
          agree={"Có"}
        />
      )}
      <DialogTitle style={{ cursor: 'move', paddingBottom: '0px' }} id="draggable-dialog-title">
        <h4 className="">{"Thêm mới"}</h4>
      </DialogTitle>
      <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
        <DialogContent>
          <Grid className="" container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                size="small"
                label={<span><span style={{ color: "red" }}>*</span>{"Tên"}</span>}
                onChange={this.handleChange}
                type="text"
                name="ten"
                value={ten}
                validators={['required']}
                errorMessages={["Không được để trống"]}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                size="small"
                label={<span><span style={{ color: "red" }}>*</span>{"Số lượng nhân viên"}</span>}
                onChange={this.handleChange}
                type="text"
                name="soLuongNV"
                value={soLuongNV}
                validators={['required']}
                errorMessages={["Không được để trống"]}
              />
            </Grid>
            
            <Grid item sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                size="small"
                label={"Trạng thái"}
                onChange={this.handleChange}
                type="text"
                name="status"
                value={status}
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <div className="flex flex-space-between flex-middle">
            <Button
              variant="contained"
              className="mr-12"
              color="secondary"
              onClick={() => this.props.handleClose()}
            >
              {"Hủy"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginRight: '15px' }}
            >
              {"Lưu"}
            </Button>

          </div>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  )
}
}
export default DepartmentDialog
