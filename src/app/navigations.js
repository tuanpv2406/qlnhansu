import ConstantList from "./appConfig";
export const navigations = [
  {
    name: "dashboard.Dashboard",
    icon: "home",
    path: ConstantList.ROOT_PATH + "dashboard/analytics",
    isVisible: true,
  },
  {
    name: "Điều hành",
    icon: "format_list_bulleted",
    isVisible: true,
    children: [
      {
        name: "Lên lịch làm việc",
        icon: "calendar_today",
        path: ConstantList.ROOT_PATH + "direction/calendar",
        invisible: true
      },
      {
        name: "Tạo hoạt động",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "direction/activity",
        icon: "subtitles",
      },
      {
        name: "Lên kế hoạch tuyển dụng",
        path: ConstantList.ROOT_PATH + "direction/recruitment",
        icon: "supervisor_account",
        isVisible: true,
      },
      {
        name: "Chấm công",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "direction/time_keeping",
        icon: "attach_money",
      },
      {
        name: "Thưởng/phạt nhân viên",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "direction/payoff",
        icon: "attach_money",
      }
    ]
  },
  {
    name: "menu.human_resources",
    icon: "format_list_bulleted",
    path: ConstantList.ROOT_PATH + "crud-table",
    isVisible: true,
    children: [
      {
        name: "Thông tin nhân viên",
        path:
          ConstantList.ROOT_PATH +
          "human_resources/employee_information",
        icon: "supervisor_account",
        isVisible: true,
      },
      {
        name: "Thông tin ứng viên",
        icon: "supervisor_account",
        path: ConstantList.ROOT_PATH + "human_resources/candicate_information",
        isVisible: true,
      }
    ]
  },
  {
    name: "menu.accountant",
    isVisible: true,
    icon: "account_circle",
    children: [
      {
        name: "Cấp kinh phí",
        path: ConstantList.ROOT_PATH + "accountant/funding",
        isVisible: true,
        icon: "subtitles"
      },
      {
        name: "Tính lương nhân viên",
        path: ConstantList.ROOT_PATH + "accountant/salary_calculation",
        isVisible: true,
        icon: "subtitles"
      },
      {
        name: "Thống kê chi tiêu",
        path: ConstantList.ROOT_PATH + "accountant/statistic",
        isVisible: true,
        icon: "subtitles"
      }
    ]
  },
  {
    name: "menu.category",
    icon: "category",
    isVisible: true,
    children: [
      {
        name: "menu.department",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "list/department",
        icon: "subtitles",
      },
      {
        name: "menu.insurrance",
        path: ConstantList.ROOT_PATH + "list/insurrance",
        isVisible: true,
        icon: "subtitles",
      },
      {
        name: "Kê khai thuế",
        path: ConstantList.ROOT_PATH + "list/tax_declaration",
        isVisible: true,
        icon: "subtitles",
      },
      {
        name: "menu.timetable",
        path: ConstantList.ROOT_PATH + "list/calendar",
        icon: "calendar_today",
        isVisible: true,
      },
    ]
  },
  {
    name: "menu.system",
    icon: "settings",
    isVisible: true,
    children: [
      {
        name: "menu.user_accounts",
        path: ConstantList.ROOT_PATH + "user_manager/user",
        isVisible: true,
        icon: "account_circle",
      },
      {
        name: "manage.menu",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "list/menu",
        icon: "keyboard_arrow_right",
      },
      {
        name: "menu.user_roles",
        path: ConstantList.ROOT_PATH + "user_manager/role",
        isVisible: true,
        icon: "how_to_reg",
      }
    ]
  }
];
