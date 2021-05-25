import React, { Component } from "react";
import {
  Grid,
  IconButton,
  Icon,
  TablePagination,
  Button,
  TextField
} from "@material-ui/core";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { findUserByUserName, searchByPage, getItemById, deleteItem } from "./UserService";
import UserEditorDialog from "./UserEditorDialog";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import shortid from "shortid";
import { saveAs } from 'file-saver';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit:3
});


const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    marginLeft: '-1.5em'
    
    }  
}))(Tooltip);
function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  return <div className="none_wrap">
  <LightTooltip title={t('general.editIcon')} placement= "right-end" enterDelay={300} leaveDelay={200}
    PopperProps={{
      popperOptions: {modifiers: {offset: {enabled: true,offset: '10px, 0px',},},},
    }} >
    <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
      <Icon fontSize="small" color="primary">edit</Icon>
    </IconButton>
  </LightTooltip>
  <LightTooltip title={t('general.deleteIcon')} placement= "right-end" enterDelay={300} leaveDelay={200}
    PopperProps={{
      popperOptions: {modifiers: {offset: {enabled: true,offset: '10px, 0px',},},},
    }} >
    <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
      <Icon fontSize="small" color="error">delete</Icon>
    </IconButton>
  </LightTooltip>
</div>;
}

class User extends Component {
  state = {
    keyword: '',
    rowsPerPage: 10,
    page: 0,
    eQAHealthOrgType: [],
    item: {},
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    selectAllItem: false,
    selectedList: [],
    totalElements: 0,
    shouldOpenConfirmationDeleteAllDialog: false
  };
  numSelected = 0;
  rowCount = 0;

  handleTextChange = event => {
    this.setState({ keyword: event.target.value }, function () {
    })
  };

  handleKeyDownEnterSearch = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  setPage = page => {
    this.setState({ page }, function () {
      this.updatePageData();
    })
  };

  setRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData();
    });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  search() {
    this.setState({ page: 0 }, function () {
      var searchObject = {};
      searchObject.text = this.state.keyword;
      searchObject.pageIndex = 1;
      searchObject.pageSize = this.state.rowsPerPage;
      findUserByUserName(searchObject.text, searchObject.pageIndex, searchObject.pageSize).then(({ data }) => {
        this.setState({ itemList: [...data.content], totalElements: data.totalElements })
      });
    });
  }

  updatePageData = () => {
    var searchObject = {};
    searchObject.text = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    if (searchObject.text && searchObject.text.trim().length > 0) {
      findUserByUserName(searchObject.text, searchObject.pageIndex, searchObject.pageSize).then(({ data }) => {
        this.setState({ itemList: [...data.content], totalElements: data.totalElements })
      });
    } else {
      searchByPage(searchObject.pageIndex, searchObject.pageSize).then(({ data }) => {
        this.setState({ itemList: [...data.content], totalElements: data.totalElements })
      });
    }
  };

  handleDownload = () => {
    var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "hello world.txt");
  }
  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDeleteAllDialog: false
    });
  };

  handleOKEditClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false
    });
    this.updatePageData();
  };

  handleDeleteUser = id => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true
    });
  };

  handleEditUser = item => {
    getItemById(item.id).then((result) => {
      this.setState({
        item: result.data,
        shouldOpenEditorDialog: true
      });
    });
  };

  handleConfirmationResponse = () => {
    var {t} = this.props;

    deleteItem(this.state.id).then(() => {
      toast.success(t("general.deleteSuccess"));
      this.updatePageData();
      this.handleDialogClose();
    });
  };

  componentDidMount() {
    this.updatePageData();
  }

  handleEditItem = item => {
    this.setState({
      item: item,
      shouldOpenEditorDialog: true
    });
  };

  handleDelete = id => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true
    });
    

  };
  async handleDeleteList(list) {
    let listAlert =[];
    for (var i = 0; i < list.length; i++) {
      // deleteItem(list[i].id)
      try {
        await deleteItem(list[i].id);
      } catch (error) {
        listAlert.push(list[i].name);
      }    
    }
    this.handleDialogClose()
  }

  handleDeleteAll = (event) => {
  //alert(this.data.length);
  this.handleDeleteList(this.data).then(() => {
    this.updatePageData();
    // this.handleDialogClose();
    this.data = null;
  }).catch(err=>{
      console.log('loi')
  });
};

  render() {
    const { t, i18n } = this.props;
    let {
      keyword,
      rowsPerPage,
      page,
      totalElements,
      itemList,
      item,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      shouldOpenConfirmationDeleteAllDialog
    } = this.state;

    let columns = [
      {
        title: t("general.action"),
        field: "custom",
        align: "left",
        width: "120px",
        headerStyle: {
          padding:'0px'
        },
        cellStyle: {
          padding:'0px'
        },
        render: rowData => <MaterialButton item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              getItemById(rowData.id).then(({ data }) => {
                if (data.parent === null) {
                  data.parent = {};
                }
                this.setState({
                  item: data,
                  shouldOpenEditorDialog: true
                });
              })
            } else if (method === 1) {
              this.handleDelete(rowData.id);
            } else {
              alert('Call Selected Here:' + rowData.id);
            }
          }}
        />
      },
      { title: t("user.username"), field: "username", width: "150" },
      { title: t("user.displayName"), field: "person.displayName", width: "150" },
      { title: t("Email"), field: "email", align: "left", width: "150" },
    ];

    return (
      <div className="m-sm-30">

        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: t('user.title') }]} />
        </div>

        <Grid container spacing={3} justify="space-between">
          <Grid item xs={12}>
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleEditItem({ startDate: new Date(), endDate: new Date(), isAddNew: true });
              }
              }
            >
              {t('Add')}
            </Button> 
             <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({
                  shouldOpenConfirmationDeleteAllDialog :true
                })
              }
              }
            >
              {t('Delete')}
            </Button>
            {shouldOpenConfirmationDeleteAllDialog && (
              <ConfirmationDialog
              title={t("general.confirm")}
                open={shouldOpenConfirmationDeleteAllDialog}
                onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.handleDeleteAll}
                text={t('general.deleteConfirm')}
                agree={t('general.agree')}
                cancel={t('general.cancel')}
              />
            )}
            <TextField
              label={t('maintainRequestStatus.filter')}
              className="mb-16 mr-10"
              type="text"
              name="keyword"
              value={keyword}
              onKeyDown={this.handleKeyDownEnterSearch}
              onChange={this.handleTextChange} />
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary" onClick={() => this.search(keyword)}>
              {t('Search')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div>
              {shouldOpenEditorDialog && (
                <UserEditorDialog t={t} i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenEditorDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  item={item}
                />
              )}

              {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={t("general.confirm")}
                  open={shouldOpenConfirmationDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationResponse}
                  text={t('general.deleteConfirm')}
                  agree={t('general.agree')}
                  cancel={t('general.cancel')}
                />
              )}
            </div>
            <MaterialTable
              title={t('user.list')}
              data={itemList}
              columns={columns}
              //parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
              parentChildData={(row, rows) => {
                var list = rows.find(a => a.id === row.parentId);
                return list;
              }}
              options={{
                selection: true,
                actionsColumnIndex: 0,
                paging: false,
                search: false
                
              }}
              components={{
                Toolbar: props => (
                  <MTableToolbar {...props} />
                ),
              }}
              onSelectionChange={(rows) => {
                this.data = rows;
                // this.setState({selectedItems:rows});
              }}
              actions={[
                {
                  hidden: true,
                  isFreeAction:true,
                  tooltip: 'Remove All Selected Users',
                  icon: 'delete',
                  onClick: (evt, data) => {
                    this.handleDeleteAll(data);
                    alert('You want to delete ' + data.length + ' rows');
                  }
                },
              ]}
            />
            <TablePagination
              align="left"
              className="px-16"
              rowsPerPageOptions={[1, 2, 3, 5, 10, 25, 50, 100]}
              component="div"
              labelRowsPerPage={t('general.rows_per_page')}
              labelDisplayedRows={ ({ from, to, count }) => `${from}-${to} ${t('general.of')} ${count !== -1 ? count : `more than ${to}`}`}
              count={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.setRowsPerPage}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default User;
