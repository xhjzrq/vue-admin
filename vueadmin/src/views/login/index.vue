<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current }" @click="toggleMneu(item)">
                    {{ item.txt }}
                </li>
            </ul>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-from">

                <el-form-item prop="username" class="item-from">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-class">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-class" v-show="menuTab[1].current">
                    <label>密码2</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6"></el-input>
                </el-form-item>

                <el-form-item prop="code" class="item-from">
                    <label>验证码</label>
                    <el-row :gutter="20">  <!--制定间隔是多少-->
                        <el-col :span="15">
                            <el-input v-model.number="ruleForm.code"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button class="block" @click="getSms()" :disabled=codebtstatus.status>{{codebtstatus.text}}</el-button>
                        </el-col>

                    </el-row>


                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" class=" login-btn block"
                               :disabled=loginbtstatus>{{!menuTab[1].current ?"登录":"注册"}}
                    </el-button>
                    <!--                    <el-button @click="resetForm('ruleForm')">重置</el-button>-->
                </el-form-item>
            </el-form>
        </div>

        <button @click="test()">aa</button>
    </div>
</template>


<script>
    import {stripscript, validatePass, validateEmail, validateVCode} from '@/utils/validate';  //写{} 因为没有deault
    import {getSms,Register,Login} from '@/api/login';
    //import  sha1 from'js-sha1';
    export default {
        name: "login",
        data() {
            let checkAge = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('验证码不能为空'));
                }
                callback();
            };
            let validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (validateEmail(value)) {
                    callback(new Error('请输入用户名'));
                } else {
                    // if (this.ruleForm.checkPass !== '') {
                    //     this.$refs.ruleForm.validateField('checkPass');
                    // }
                    callback(); //返回true
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            let validatePasss = (rule, value, callback) => {
                //以为 v-show 还是会发送请求  v-if 不会 这里采取v-show  或者 在 meuntab 中 价格type  在几个一个变量 点击时修改
                if (!this.menuTab[1].current) {
                    callback();
                }
                if (value != this.ruleForm.password) {
                    callback(new Error('不一样'));
                } else {
                    callback();
                }
            };
            return {
                menuTab: [
                    {txt: "登录", current: true},
                    {txt: "注册", current: false}
                ],
                ruleForm: {
                    username: 'xhj@qq.com',
                    password: '',
                    code: '',
                    passwords: ''
                }, rules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'} /// blur 触发方式 失去焦点得时候会触发  validatePass 方法
                    ],
                    password: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    passwords: [
                        {validator: validatePasss, trigger: 'blur'}
                    ],
                    code: [
                        {validator: checkAge, trigger: 'blur'}
                    ]
                },
                loginbtstatus: true,
                codebtstatus:{
                    status:false,
                    text:'获取验证码'
                },
                timer:''

            }


        },
        methods: {
            toggleMneu(data) {
                this.menuTab.forEach(elem => {
                    elem.current = false
                })
                data.current = true
                this.$refs['ruleForm'].resetFields();
                this.clearCountDown();
            },
            submitForm(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       !this.menuTab[1].current== true ?this.login():this.register();
                      // return false;

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            login(){
                let requsetData={
                    username: this.ruleForm.username,
                    password: this.ruleForm.password,
                    code: this.ruleForm.code,
                }
               // console.log(this.$store.commit("SET_ISCOLLAPSE"))
                this.$store.dispatch('app/login',requsetData)
                .then(response=>{
                            console.log(response)
                            this.$router.push({
                                name:'Console'
                            })
                        }).catch(error=>{

                        })
                // Login(requsetData).then(response=>{
                //     console.log(response)
                //     this.$router.push({
                //         name:'Console'
                //     })
                // }).catch(error=>{
                //
                // })
            },
            register(){
                let requsetData={
                    username: this.ruleForm.username,
                    password: this.ruleForm.password,
                    code: this.ruleForm.code,
                }
                Register(requsetData).then(response=>{

                    this.$message({
                        message: response.data.message,
                        type: 'success'
                    });
                    this.toggleMneu(this.menuTab[0]);
                    this.clearCountDown();
                }).catch(error=>{

                })
            },
            getSms() {
                if (this.ruleForm.username == '') {
                    this.$message.error("输入用户名")
                    return false;
                }
                if (validateEmail(this.ruleForm.username)) {
                    this.$message.error("输入用户名");
                    return false;
                }
                let data = {
                    username: this.ruleForm.username,
                   // module:'login'
                };
                this.codebtstatus.status=true;
                this.codebtstatus.text='发送中';

                getSms(data).then(response => { //.then 接受得 Promise.resolve
                    console.log(response)
                    let code=response.data.message.substring(response.data.message.length-6,response.data.message.length);
                    this.ruleForm.code=code
                    this.$message({
                        message: code,
                        type: 'success'
                    });
                    this.loginbtstatus = false;
                    this. countDown(5)
                }).catch(error => { // catch 接收得就是 Promise.reject(data) 这个东西
                    console.log(error)
                });


            },
            countDown(number) {
                //settimeout //只执行一次
                //setInterval  不断的执行 需要条件才会停止
                // 判断定时器是否存在，存在则清除
                if(this.timer) { clearInterval(this.timer); }
                this.timer=setInterval(()=>{
                    number--;
                    if (number==0){
                        clearInterval(this.timer)
                        this.codebtstatus.status=false;
                        this.codebtstatus.text='再次获取';
                    }else{
                        this.codebtstatus.text=`倒计时${number}秒`;
                    }

                },1000)
             },
            /**
             * 清除倒计时
             */
             clearCountDown(){
                this.codebtstatus.status=false;
                this.codebtstatus.text='获取验证码';
                clearInterval(this.timer)
            },
            test(){

                this.$store.commit('login/aaa','10')
                  console.log(this.$store.state.login.aaa)
            }


        },
        // watch: {
        //     'ruleForm.code': function () {
        //         if (this.ruleForm.code != '') {
        //             this.loginbtstatus = false;
        //         } else {
        //             this.loginbtstatus = true;
        //         }
        //     }
        // }
    }
</script>
<style lang="scss" scoped>
    #login {
        height: 100vh; // vh 根据可视窗口来显示得
        background-color: #344a5f;
    }

    .login-wrap {
        width: 330px;
        margin: auto;
    }

    .menu-tab {
        text-align: center;

        li {
            display: inline-block;
            width: 88px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
        }

        .current {
            background-color: rgba(0, 0, 0, .1);
        }
    }

    .login-from {
        margin-top: 29px;

        label {
            display: block;
            margin-bottom: 3px;
            font-size: 14px;
            color: #fff;
        }
    }

    .item-from {
        margin-bottom: 13px;
    }

    .block { //不加这个 他不会沾满一整行
        width: 100%;
        display: block;
    }

    .login-btn {
        margin-top: 19px;
    }
</style>
