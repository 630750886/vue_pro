<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="50%"
    :title="title1"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
      <el-row>
        <el-col :span="12">
          <!-- <el-form-item label="实际收款金额"> </el-form-item> -->
          <el-form-item label="收款金额(元)" prop="collMoney">
            <el-input v-model="form.collMoney"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <!-- <el-form-item label="已登记金额"> </el-form-item> -->
          <el-form-item label="收款类型" prop="collType">
            <!-- <rea-select v-model="form.collType" :data="collTypeOptions">

						</rea-select> -->
            <el-select v-model="form.collType">
              <el-option
                v-for="item in form.category == '0'
                  ? collTypeOptions
                  : collTypeOptions_B"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <template v-if="form.collType == 1">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="合同编号"
              prop="contractId"
              :rules="[
                {
                  required: true,
                  message: '合同编号为必填项',
                  trigger: 'blur',
                },
              ]"
            >
              <rea-query-input
                v-model="form.contractId"
                url="agr/busicontractbase/findall"
                filter-obj="{}"
                filter-key="contractCode"
                @getObject="
                  (item) => {
                    form.contract_name = item.contractName;
                    form.orgname =
                      item.allSysOrgName.split('/')[
                        item.allSysOrgName.split('/').length - 1
                      ];
                  }
                "
              ></rea-query-input>
              <!-- <el-select v-model="form.projectNum" multiple>
									<el-option label="001" value="001"></el-option>
								</el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同名称">
              <el-input v-model="form.contract_name" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row>
          <el-col :span="24">
            <el-form-item>
            </el-form-item>
          </el-col>
        </el-row> -->

        <!-- <template v-for="i in num">-->
        <!-- <el-row> 2021-08-04 应用户要求不用选择项目，只到合同
          <el-col :span="12">
            <el-form-item label="项目编号" prop="projectId" :rules="[{ required: true, message: '项目编号为必填项', trigger: 'blur' }]">
              <rea-query-input
                v-model="form.projectId"
                url="pro/cmbaseproject/findwhere"
                filter-key="projectCode"
                :filter-obj="{ contractCode: form.contractId }"
                @getObject="
                  (item) => {
                    form.project_name = item.projectName;
                  }
                "
              ></rea-query-input>

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称">
              <el-input v-model="form.project_name" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!--</template>-->
      </template>

      <template v-if="form.collType == 3">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="合同编号"
              prop="contractId"
              :rules="[
                {
                  required: true,
                  message: '合同编号为必填项',
                  trigger: 'blur',
                },
              ]"
            >
              <rea-query-input
                v-model="form.contractId"
                url="agr/busicontractbase/findall"
                filter-obj="{}"
                filter-key="contractCode"
                @getObject="
                  (item) => {
                    form.contract_name = item.contractName;
                    form.orgname =
                      item.allSysOrgName.split('/')[
                        item.allSysOrgName.split('/').length - 1
                      ];
                  }
                "
              ></rea-query-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同名称">
              <el-input v-model="form.contract_name" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row>  2021-08-04 应用户要求不用选择项目，只到合同
          <el-col :span="12">
            <el-form-item
              label="项目编号"
              prop="projectId"
              :rules="[
                {
                  required: true,
                  message: '项目编号为必填项',
                  trigger: 'blur',
                },
              ]"
            >
              <rea-query-input
                v-model="form.projectId"
                url="pro/cmbaseproject/findwhere"
                filter-key="projectCode"
                :filter-obj="{ contractCode: form.contractId }"
                @getObject="
                  (item) => {
                    form.project_name = item.projectName;
                  }
                "
              ></rea-query-input>

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称">
              <el-input v-model="form.project_name" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!--</template>-->
      </template>

      <template
        v-if="form.collType == 4 || form.collType == 7 || form.collType == 8"
      >
        <el-form-item
          label="所属组织"
          prop="orgId"
          :rules="[
            { required: true, message: '所属组织为必填项', trigger: 'blur' },
          ]"
        >
          <rea-cascader
            v-model="form.orgId"
            :data="orgTree"
            :props="optionProps"
            @getLabel="
              (s) => {
                form.orgname = s.split('/')[s.split('/').length - 1];
              }
            "
          ></rea-cascader>
        </el-form-item>
      </template>
      <template v-if="form.collType == 5">
        <!-- <el-form-item label="收取方式">
					<el-select v-model="form.payType" >
						<el-option value="1" label="总公司"></el-option>
						<el-option value="2" label="总公司代缴纳"></el-option>
					</el-select>
				</el-form-item> -->
        <!-- <el-form-item label="类型">
          <el-select v-model="form.riskType">
            <el-option value="项目" label="项目"></el-option>
            <el-option value="非项目" label="非项目"></el-option>
          </el-select>
        </el-form-item> -->
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="合同编号"
              prop="contractId"
              :rules="[
                {
                  required: true,
                  message: '合同编号为必填项',
                  trigger: 'blur',
                },
              ]"
            >
              <rea-query-input
                v-model="form.contractId"
                url="agr/busicontractbase/findall"
                filter-obj="{}"
                filter-key="contractCode"
                @getObject="
                  (item) => {
                    //form.agreementkeyid = item.keyid;
                    //form.contractItem=item;
                    form.contract_name = item.contractName;
                    form.orgname =
                      item.allSysOrgName.split('/')[
                        item.allSysOrgName.split('/').length - 1
                      ];

                    //form.contractId = item.contractCode;
                  }
                "
              ></rea-query-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同名称">
              <el-input v-model="form.contract_name" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-if="form.collType == 6">
        <el-form-item
          label="保证金类型"
          prop="depositType"
          :rules="[
            { required: true, message: '保证金类型为必填项', trigger: 'blur' },
          ]"
        >
          <el-select v-model="form.depositType">
            <el-option
              v-for="item in depositTypeOptions"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <template v-if="form.depositType == '投标'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="分包编号" prop="contractId"  :rules="[
                  {
                    required: true,
                    message: '分包编号为必填项',
                    trigger: 'blur',
                  },
                ]">
                <rea-query-input
                  v-model="form.contractId"
                  url="tender/bidopeningevaluation/findallcode"
                  filter-obj="{}"
                  filter-key="bidsectioncode"
                  @getObject="
                    (item) => {
                      form.contract_name = item.bidsectionname;                      
                    }
                  "
                ></rea-query-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="分包名称">
                <el-input v-model="form.contract_name" readonly></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-form-item
                label="项目名称"
                prop="project_name"
                :rules="[
                  {
                    required: true,
                    message: '项目名称为必填项',
                    trigger: 'blur',
                  },
                ]"
              >
                <rea-query-input
                  v-model="form.project_name"
                  url="tender/tenderinfo/findall"
                  filter-obj="{}"
                  filter-key="projectname"
                  @getObject="
                    (item) => {
                      //form.project_name = item.projectName;
                      form.orgname =
                        item.allSysOrgName.split('/')[
                          item.allSysOrgName.split('/').length - 1
                        ];
                    }
                  "
                ></rea-query-input>
              </el-form-item>
            </el-col> -->
          </el-row>
        </template>
        <template v-if="form.depositType == '招标'">
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="合同编号"
                prop="contractId"
                :rules="[
                  {
                    required: true,
                    message: '合同编号为必填项',
                    trigger: 'blur',
                  },
                ]"
              >
                <rea-query-input
                  v-model="form.contractId"
                  url="agr/busicontractbase/findall"
                  filter-obj="{}"
                  filter-key="contractCode"
                  @getObject="
                    (item) => {
                      form.contract_name = item.contractName;
                      form.orgname =
                        item.allSysOrgName.split('/')[
                          item.allSysOrgName.split('/').length - 1
                        ];
                    }
                  "
                ></rea-query-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="合同名称">
                <el-input v-model="form.contract_name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!---->
          <!-- <el-row> 2021-08-04 应用户要求不用选择项目，只到合同
            <el-col :span="12">
              <el-form-item label="项目编号" prop="projectId">
                <rea-query-input
                  v-model="form.projectId"
                  url="pro/cmbaseproject/findwhere"
                  filter-key="projectCode"
                  :filter-obj="{ contractCode: form.contractId }"
                  @getObject="
                    (item) => {
                      form.project_name = item.projectName;
                    }
                  "
                ></rea-query-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input v-model="form.project_name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
        </template>
      </template>
    </el-form>

    <dialog-button
      :resetBtn="{ show: false }"
      :cancelBtn="{ show: false }"
      okBtn="确 定"
      @okBtn="submitFormData"
      @cancelBtn="dialogClose"
    ></dialog-button>
  </el-dialog>
</template>

<script>
import DialogButton from "../../../acomponents/DialogButton.vue";
import Station from "../../../acomponents/Station.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    DialogButton,
    Station
  },
  props: {
    title: {
      type: String,
      dealt: "",
    }
  },
  watch: {
    title(newValue) {
      this.title = newValue;
    }
  },
  computed: {
    ...mapState({
      orgTree: (state) => state.loadType.organizeList // state.orgAndPost.orgTree
    })
  },
  mounted() {
    // console.log(this.orgTree);
  },
  data: function () {
    return {
      optionProps: {
        value: "keyid",
        label: "label",
        children: "children",
        emitPath: false
      },
      filterObj: {},
      // 父窗口传递的弹窗标题
      title1: this.title,
      // 弹窗显示控制
      dialogVisible: false,
      num: 1,

      // 收费类型
      collTypeOptions: [
        // 服务费、中标服务费、文件费、管理费、风险（履约）保证金、投标保证金、其他往来款、其他收款
        { id: 1, name: "服务费" },
        { id: 3, name: "文件费" },
        { id: 4, name: "管理费" },
        { id: 8, name: "其他收款" },
      ],
      collTypeOptions_B: [
        { id: 5, name: "风险（履约）保证金" },
        { id: 6, name: "投标保证金" },
        { id: 7, name: "其他往来款" },
      ],
      depositTypeOptions: [
        { id: "招标", name: "招标" },
        { id: "投标", name: "投标" },
      ],
      // 表单对象
      form: {
        contractItem: {},
        contractId: "",
        // sumlist: "",
        // pkeyid:'',
        // collType: {},
        // sumtype:'',
        // agreementkeyid: "",
        // agreementname: "",
        // projectkeyid: "",
        // projectname: "",
        // orgkeyid: "",
        // orgname:"",
        // payType: "",
        // bondType: "",
        // type: "",
        // contractCodes: { contractCode: "" }
      },
      // 表单验证规则
      formRules: {
        // contractCode:[{ required: true, message: '合同编号为必填项', trigger: 'blur' }],
        collType: [
          { required: true, message: '收款类型为必选项', trigger: 'blur' }
        ],
        collMoney: [
          { required: true, message: '收款金额为必选项', trigger: 'blur' }
        ]
        // orgId:[{ required: true, message: '组织为必填项', trigger: 'blur' }],
        // projectId:[{ required: true, message: '项目编号为必填项', trigger: 'blur' }],
        // project_name:[{ required: true, message: '项目名称为必填项', trigger: 'blur' }],
        // depositType:[{ required: true, message: '保证金类型为必填项', trigger: 'blur' }]
      }
    };
  },

  methods: {
    // 设置弹窗显示
    openDialog(val) {
      this.form = val;
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit("getFormData", this.$myfunction.copyData(this.form));
          this.dialogClose();
        } else {
          this.$message.success("数据录入完不完整!请确认!");
        }
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>

<style scoped></style>
