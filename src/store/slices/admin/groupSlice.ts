import { fetchAllGroupList, fetchCreateGroup, fetchDeleteGroup, fetchDepartmentUsers, fetchDetailGroup, fetchEditGroup, fetchGroupList } from "@/store/thunks/admin/groupThunk";
import { Department, DepartmentChecked, Group, GroupDetail, GroupList, GroupState, User } from "@/types/group";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GroupState = {
  loading: false,
  groupErrors: undefined,
  success: false,
  groupMessage: '',
  groupParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  allGroupList: [],
  filteredAllGroupList: [],
  selectedGroupsDraft: [],
  groupList: {} as GroupList,
  groupDetail: {} as GroupDetail,
  departmentFilterParam: {
    fromRank: '',
    toRank: '',
    departments: [],
  },
  departmentUsers: [],
  selectedDepartmentUsersDraft: [],
  selectedDepartmentUsers: [],
  selededUsersBinded: false,
}

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.groupErrors = undefined;
    },
    updateParams: (state, action) => {
      state.groupParams = action.payload;
    },
    updateGroupParams: (state, action) => {
      state.departmentFilterParam = action.payload;
    },
    resetGroupParams: (state) => {
      state.departmentFilterParam = {
        fromRank: '',
        toRank: '',
        departments: [],
      };
      state.selectedDepartmentUsers = [];
      state.selectedDepartmentUsersDraft = [];
      state.selectedGroupsDraft = [];
    },
    resetMessage: (state) => {
      state.success = false;
      state.groupMessage = ''; 
    },
    resetBindedState: (state) => {
      state.selededUsersBinded = false;
    },
    filterGroup: (state, action) => {
      state.filteredAllGroupList = state.allGroupList.filter(group => {
        const regex = new RegExp(action.payload, 'i'); // 'i' flag for case-insensitive matching
        return regex.test(group.name);
      });
    },
    updateSelectedGroups: (state, action) => {
      state.selectedGroupsDraft = action.payload;
    },
    deleteGroup: (state, action) => {
      const newgroupList = state.selectedGroupsDraft.filter(item => item.id !== action.payload);
      state.selectedGroupsDraft = newgroupList;
    },
    updateSelectedUsers: (state, action) => {
      state.selectedDepartmentUsersDraft = action.payload;
      state.selectedDepartmentUsers = [];
      action.payload.map((department: DepartmentChecked) => {
        department &&
          department.users.map((user: User) => {
            let tmp_user = {
              ...user,
              department: department.name
            };
            state.selectedDepartmentUsers.push(tmp_user);
          });
      })
      state.selededUsersBinded = true;
    },
    deleteMember: (state, action) => {
      const newuserList = state.selectedDepartmentUsers.filter(item => item.id !== action.payload);
      state.selectedDepartmentUsers = newuserList;
    },
    setSelectedGroups: (state, action) => {
      state.selectedGroupsDraft = action.payload;
    },
    setSelectedUsers: (state, action) => {
      action.payload.map((department: any) => {
        if(department.id)
          state.selectedDepartmentUsersDraft[department.id] = {
            name: department.name,
            users: department.users,
          }
      })
      
    }
  },
  extraReducers: builder => {
    builder
      // fetchAllGroupList
      .addCase(fetchAllGroupList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllGroupList.fulfilled, (state, action) => {
        state.loading = false;
        state.allGroupList = action.payload;
        state.filteredAllGroupList = action.payload;
      })
      .addCase(fetchAllGroupList.rejected, (state, action) => {
        state.loading = false;
        state.groupErrors = action.payload;
      })
      // fetchGroupList
      .addCase(fetchGroupList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchGroupList.fulfilled, (state, action) => {
        state.loading = false;
        state.groupList = action.payload;
      })
      .addCase(fetchGroupList.rejected, (state, action) => {
        state.loading = false;
        state.groupErrors = action.payload;
      })
      // fetchCreateGroup
      .addCase(fetchCreateGroup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.groupMessage = action.payload.message;
      })
      .addCase(fetchCreateGroup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.groupErrors = action.payload;
      })
      // fetchDetailGroup
      .addCase(fetchDetailGroup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailGroup.fulfilled, (state, action) => {
        state.groupDetail = action.payload;
        state.groupDetail.departments.map(department => {
          if(department.id)
            state.selectedDepartmentUsersDraft[department.id] = {
              name: department.name,
              users: department.users,
            }
        })
        state.loading = false;
      })
      .addCase(fetchDetailGroup.rejected, (state, action) => {
        state.loading = false;
        state.groupErrors = action.payload;
      })
      // fetchEditGroup
      .addCase(fetchEditGroup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.groupMessage = action.payload.message;
      })
      .addCase(fetchEditGroup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.groupErrors = action.payload;
      })
      // fetchDeleteGroup
      .addCase(fetchDeleteGroup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.groupMessage = action.payload.message;
      })
      .addCase(fetchDeleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.groupErrors = action.payload;
      })
      // fetchDepartmentUsers
      .addCase(fetchDepartmentUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDepartmentUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentUsers = action.payload;
      })
      .addCase(fetchDepartmentUsers.rejected, (state, action) => {
        state.loading = false;
        state.groupErrors = action.payload;
      })
  }
})

export const {
  initialise, 
  resetErrors, 
  updateParams, 
  resetMessage, 
  filterGroup,
  updateSelectedGroups,
  deleteGroup,
  updateSelectedUsers, 
  updateGroupParams, 
  deleteMember,
  resetGroupParams,
  resetBindedState,
  setSelectedGroups,
  setSelectedUsers,
} = groupSlice.actions;

const {reducer: groupReducer} = groupSlice;
export default groupReducer;