<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <% request.setCharacterEncoding("utf-8"); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Push Server Admin</title>
 <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>PushServer Admin</title>
 
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="css/plugins/morris/morris-0.4.3.min.css" rel="stylesheet">
    <link href="css/plugins/timeline/timeline.css" rel="stylesheet">
    <link href="css/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet">
    <link href="css/bootstrap-datetimepicker.css" rel="stylesheet">
    <link href="css/sb-admin.css" rel="stylesheet">
  
<!-- 	<link rel="stylesheet" href="css/TableBarChart.css" /> -->
           
    <script src="js/jquery-1.10.2.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="js/sb-admin.js"></script>
    <script src="js/pages/main.js"></script>
    <script type="text/javascript" src="js/smoothie.js"></script>
    <script src="js/plugins/dataTables/jquery.dataTables.js"></script>
    <script src="js/plugins/dataTables/dataTables.bootstrap.js"></script>
    <script src="ckeditor/ckeditor.js"></script> 
    <script src="js/plugins/morris/raphael-2.1.0.min.js"></script>
    <script src="js/plugins/morris/morris.js"></script>


  
<!--       <script type="text/javascript" src="js/TableBarChart.js"></script> -->




</head>

<body>
  <div id="wrapper">
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.jsp">Push Server Admin </a>
                
            </div>
            <div class="navbar-default navbar-static-side" role="navigation">
                <div class="sidebar-collapse">
                    <ul class="nav" id="side-menu">
                        <li>
                            <a href="#"><i class="fa fa-dashboard fa-fw"></i> Dashboard <span class="fa arrow"></a>
                            
                               <ul class="nav nav-second-level">
                                <li>
                                    <a href="#" onclick="javascript:wrapperFunction('monitoring');">시스템 모니터링</a>
                                </li>
                                 <li>
                                    <a href="#" onclick="javascript:wrapperFunction('messageList');">메세지 발송 리스트</a>
                                </li>
<!--                                 <li> -->
<!--                                     <a href="#" onclick="javascript:wrapperFunction('stats');">메세지 통계</a> -->
<!--                                 </li> -->
                                 <li>
                                    <a href="#" onclick="javascript:wrapperFunction('surveyList');">설문조사 리스트</a>
                                </li>
                               
                           
                            </ul>
                            
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-envelope fa-fw"></i> Push Message <span class="fa arrow"></a>
                            
                            <ul class="nav nav-second-level">
                                <li>
                               
                                    <a href="#" onclick=" javascript:wrapperFunction('individual');">개인 메세지</a>
                                </li>
                                <li>
                                    <a href="#" onclick="javascript:wrapperFunction('groupMessage');">그룹 메세지</a>
                              
                                </li>
<!--                                  <li> -->
<!--                                    <a href="#" onclick="javascript:wrapperFunction('excel');">대량 메세지</a> -->
<!--                                 </li> -->
                                   <li>
                                   <a href="#" onclick="javascript:wrapperFunction('allMessage');">전체 메세지</a>
                                </li>
                                
                                 <li>
                                   <a href="#" onclick="javascript:wrapperFunction('research');">설문조사</a>
                                </li>
                                 <li>
                                   <a href="#" onclick="javascript:wrapperFunction('category');">카테고리 관리</a>
                                </li>
                                 <li>
                                   <a href="#" onclick="javascript:wrapperFunction('reservation');">예약 메세지 관리</a>
                                </li>
                       
                        
<!--                                 <li> -->
<!--                                   <a href="#">Third Level <span class="fa arrow"></span></a> -->
<!--                                        <ul class="nav nav-third-level"> -->
<!--                                         <li> -->
<!--                                             <a href="#">Third Level Item</a> -->
<!--                                         </li> -->
<!--                                         <li> -->
<!--                                             <a href="#">Third Level Item</a> -->
<!--                                         </li> -->
<!--                                         <li> -->
<!--                                             <a href="#">Third Level Item</a> -->
<!--                                         </li> -->
<!--                                         <li> -->
<!--                                             <a href="#">Third Level Item</a> -->
<!--                                         </li> -->
<!--                                     </ul> -->
<!--                                 </li> -->
<!--                                 <li> -->
<!--                                    <a href="#" onclick="javascript:wrapperFunction('formManager');">서식 관리</a> -->
<!--                                 </li> -->
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-user fa-fw"></i> Admin<span class="fa arrow"></span></a>
                              <ul class="nav nav-second-level">
                               
<!--                                 <li> -->
<!--                                     <a href="#" onclick="javascript:wrapperFunction('changePass');">비밀 번호 변경</a> -->
<!--                                 </li> -->
                                 <li>
                                   <a href="#" onclick="javascript:wrapperFunction('userAdd');">관리자 등록</a>
                                </li>
                                 <li>
                                   <a href="#" onclick="javascript:wrapperFunction('userManager');">관리자 목록</a>
                                </li>
                                 <li>
                                    <a href="#" onclick="javascript:logoutFunction();">로그아웃</a>
                                </li>
                                
                            </ul>
                        </li>
                    </ul>
                    <!-- /#side-menu -->
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <div id="page-wrapper">
 
        </div>
    </div>
    <!-- /#wrapper -->

    <!-- Core Scripts - Include with every page -->


</body>
</html>