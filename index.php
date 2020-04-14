<?php 

  /**
   * Chamada ao path.php
   * 
   * @author Rui Coelho
   */
  include('navbar.php'); 

?>

<?php

  /**
   * Complemento do header chamado no path.php
   * 
   * @author Rui Coelho
   */

  startblock('head')

?>

	<meta name="description" content="Think Twice Hackthon">
	<title>Think Twice - Hackathon</title>

<?php

  /**
   * Termino do complemento e retorno ao path.php
   * 
   * @author Rui Coelho
   */
  
  endblock() 

?>

<?php 
  
  /**
   * CSS personalizado chamado no path.php
   * 
   * @author Rui Coelho
   */
  
   startblock('custom_css')

?>
    <link href="static/css/agency.min.css" rel="stylesheet">
    <link href="static/css/navbar.css" rel="stylesheet">

<?php 

 /**
   * Termino da chamada da personalização do CSS 
   * e retorno ao path.php
   * 
   * @author Rui Coelho
   */
  
  endblock() 

?>


<?php

  /**
   * Complemento do header chamado no path.php
   * 
   * @author Rui Coelho
   */
  
   startblock('body')
?>

  <!-- Header -->
  <header class="masthead">
    <div class="container">
      <div class="intro-text">
        <div class="intro-heading text-uppercase">CV Plataform</div>
        <div class="intro-lead-in">Think Twice 2019</div>
      </div>
    </div>
  </header>

<?php

  /**
   * Termino do complemento e retorno ao path.php
   * 
   * @author Rui Coelho
   */
  
  endblock()
?>
