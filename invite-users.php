<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm'?>

    <!-- Bootstrap Data Table Plugin -->
    <link rel="stylesheet" href="css/components/bs-datatable.css" type="text/css">

    <?php require 'partials/angular.html' ?>
</head>
<body class="stretched" ng-app="invite" ng-controller="InviteController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/header.htm'?>
    <section id="page-title" class="page-title-right">

        <div class="container clearfix">
            <h1>Invite Users</h1>
            <span> Delegate Market Access </span>
            <ol class="breadcrumb">
                <li><a href="#">Home</a></li>
                <li><a href="javascript:navService.goto('manage_markets')">Markets</a></li>
                <li class="active" ng-bind="market.name"></li>
            </ol>
        </div>

    </section>
    <section id="content">

        <div class="content-wrap">
            <div class="container clearfix">
                <div class="row">
                    <div class="col-lg-6">
                        <h2>Caroler Requests</h2>
                        <div class="table-responsive">
                            <table class="table" cellspacing="0" width="100%">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr ng-repeat="request in carolerRequests">
                                    <td ng-bind="request.name"></td>
                                    <td ng-bind="request.email"></td>
                                    <td>
                                        <button class="btn btn-success" title="Approve">
                                            <i class="icon-thumbs-up2"></i>
                                        </button>
                                        <button class="btn btn-danger" title="Deny">
                                            <i class="icon-thumbs-down2"></i>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h2>Invite Carolers</h2>
                        <div class="col_full">
                            <input ng-keyup="searchUsers()" ng-model="searchUsersInput" type="text" class="form-control"
                                   placeholder="Start Typing..">
                        </div>
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="user in found" ng-click="selectedUser = user">
                                <td ng-bind="user.name"></td>
                                <td ng-bind="user.email"></td>
                                <td>
                                    <button ng-click="inviteCaroler(user)" class="btn btn-sm btn-primary">invite &gt;&gt;</button>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>

    </section>
    <?php require 'partials/footer.htm'?>
</div>

<!-- JAVASCRIPTS
========================== -->
<?php require 'partials/javascripts.htm' ?>
<!-- Bootstrap Data Table Plugin -->
<script type="text/javascript" src="js/components/bs-datatable.js"></script>
</body>
</html>