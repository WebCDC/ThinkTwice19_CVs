<?php include('navbar.php'); ?>

<?php startblock('head') ?>
<meta name="description" content="Acesso aos currículos">
<title>Think Twice - Login</title>
<?php endblock() ?>

<?php startblock('custom_css')?>
<link href="static/css/agency.css" rel="stylesheet">
<?php endblock()?>

<?php if( !($_POST) ) : ?>
	<?php startblock('body') ?>
		<section id="lgin">
			<div class="container">
			<form class="form-signin col-8 offset-2 " role="form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>"
			method="post">
				<input type="text" class="form-control" name="username" placeholder="utilizador" required autofocus>
				
				<input type="password" class="form-control mt-2" name="password" placeholder="password" required>
				
				<button class="btn btn-lg btn-primary btn-block mt-3" type="submit" name="login">Login</button>
				
				<h5 align="center" style="color:red">
					<?php if(array_key_exists('emp_login_msg',$_SESSION)){echo $_SESSION['emp_login_msg']; unset($_SESSION['emp_login_msg']);}?>
				</h5>
			</form>
			</div>
		</section>
	<?php endblock() ?>
	
<?php else: ?>
	<?php

		/**
	   * Comunicação do site com a base de dados do NEI
	   * bloqueia acessos indevidos aos apontamentos
	   * por parte de externos.
	   * 
	   * @author Tiago F. Cardoso
	   * 
	   */
		require_once('pHash.php');
		
		if (isset($_POST['login']) && !empty($_POST['username']) && !empty($_POST['password'])) {
			// Create connection
			$conn = new mysqli($servername, $username, $password);
			$conn->select_db("deti-thtw"); 
			if ($stmt = $conn->prepare("SELECT e_login, e_name, e_pwd, e_access FROM empresas WHERE (e_login=? OR e_email=?)")) {
				$stmt->bind_param("ss", $_POST['username'], $_POST['username']);
				$stmt->execute();
				$result = $stmt->get_result();
				if ($result->num_rows > 0) {
					$row = $result->fetch_assoc();
					$wp_hasher = new PasswordHash(8, TRUE);
					if($wp_hasher->CheckPassword($_POST['password'], $row["e_pwd"])) {
						$_SESSION['emp_valid'] = true;
						$_SESSION['emp_timeout'] = time();
						$_SESSION['emp_ename'] = $row["e_name"];
						$_SESSION['emp_elogin'] = $row["e_login"];
						$_SESSION['emp_eaccess'] = $row["e_access"];
						if (isset($_SESSION['emp_after_login'])) {
							header("Location: " . $_SESSION['emp_after_login']);
							unset($_SESSION['emp_after_login']);
						}else{
							header('Location: index.php');
						};
						exit();
					} else {
						$_SESSION['emp_login_msg'] = 'Password Inválida!';
					}
				}else{
					$_SESSION['emp_login_msg'] = 'Utilizador Inválido!';
				}
			}
			$conn->close();
			header('Location: '.$_SERVER['PHP_SELF']);
			die();
		}
		?>
<?php endif; ?>
	