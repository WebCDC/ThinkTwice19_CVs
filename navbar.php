<?php
	/**
	* Início da comunicação com o servidor.
	* Introdução dos dados fornecidos pelo utilizador
	* e validação dos mesmos.
	* 
	* @author Rui Coelho
	*/

	ob_start();
	session_start();
	
	require_once('ti.php');
	$servername = "mysql-sa.mgmt.ua.pt";
	$username = "deti-thtw-web";
	$password = "Q4ICoHbGntraIPgd";
	
	/**
	 * Expira a sessão passado 30 minutos.
	 */
	if (isset($_SESSION['emp_timeout']) && (time() - $_SESSION['emp_timeout'] > 1800)) {
		session_unset();
		session_destroy();
	}

	error_reporting(E_ALL);
	ini_set("display_errors", 1);
?>
<!DOCTYPE html>
<html lang="pt-pt">

<head>
  <meta http-equiv="Content-type" content="text/html; charset=iso-8859-1" /> 
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="keywords" content="HTML,CSS,JavaScript,PHP">
  <meta name="author" content="">
  <link rel="shortcut icon" type="image/png" href="static/img/thinktwice.png"/>
  <?php startblock('head') ?><?php endblock() ?>

  <!-- Bootstrap core CSS -->
  <link href="static/css/bootstrap.min.css" rel="stylesheet">
  <link href="static/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- Custom fonts for this template -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
  <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
  
  <?php startblock('custom_css') ?><?php endblock() ?>
</head>

<body id="page-top">
	<nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
		<div class="container">
			<a class="navbar-brand js-scroll-trigger" href="index.php">
				<img src="static/img/thinktwice.png" style="height: 5vh;">
			</a>
			<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive"
				aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				Menu
				<i class="fas fa-bars"></i>
			</button>
			<div class="collapse navbar-collapse" id="navbarResponsive">
		
				<ul class="navbar-nav text-uppercase ml-auto">

					<li class="nav-item">
						<a class="nav-link js-scroll-trigger" aria-title="Curriculos" href="curriculos.php">Currículos</a>
					</li>

					<?php if(isset($_SESSION['emp_valid']) && isset($_SESSION['emp_ename'])) : ?>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" aria-title="username" data-toggle="dropdown"><?php echo $_SESSION['emp_ename']; ?><span
								class="u-down-arrow"></span></a>
						<ul class="dropdown-menu resize">
							<li>
								<a href="logout.php">
									LogOut
								</a>
							</li>
							<li>
								<a href="usercpass.php">
									Mudar Password
								</a>
							</li>
						</ul>
					</li>
					<?php else : ?>
					<li class="nav-item">
						<a class="nav-link js-scroll-trigger" aria-title="Login" href="login.php">Login</a>
					</li>
					<?php endif; ?>
				</ul>
			</div>
		</div>
	</nav>
	
	<?php startblock('body') ?><?php endblock() ?>
	    <!-- Footer -->
		<footer>
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <span class="copyright">Copyright &copy; NEI- AAUAv & IEEE UA SB  <br>
            	Developed by <a href="https://user-cube.github.io/aboutMePT/" rel="nofollow">rc</a></span>
          </div>
          <div class="col-md-4">
          	<h2>NEI-AAUAv</h2>
            <ul class="list-inline social-buttons">
              <li class="list-inline-item">
                <a href="https://www.instagram.com/nei.aauav/">
                  <i class="fa fa-instagram"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="https://www.facebook.com/nei.aauav">
                  <i class="fa fa-facebook"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="https://www.linkedin.com/company/nei-aauav/">
                  <i class="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
          	<h2>IEEE UA SB</h2>
            <ul class="list-inline social-buttons">
              <li class="list-inline-item">
                <a href="https://www.instagram.com/ieeeuasbpt/">
                  <i class="fa fa-instagram"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="https://www.facebook.com/ieeeuasbpt/">
                  <i class="fa fa-facebook"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="https://www.linkedin.com/company/ieeeuniversityofaveirostudentbranch/">
                  <i class="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
      </div>
    </footer>
	
	<!-- Bootstrap core JavaScript -->
	<script src="static/js/jquery.min.js"></script>
	<script src="static/js/bootstrap.min.js"></script>
	<script src="static/js/popper.min.js"></script>

	<!-- Base Template JS-->
	<script src="static/js/agency.js"></script>

	<!-- Custom JS -->
	<?php startblock('custom_js') ?><?php endblock() ?>
</body>
</html>
