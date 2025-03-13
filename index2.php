<!DOCTYPE html>
<html>
  <head>
    <title>Assinatura Eletrônica</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
      }
      canvas {
        border: 1px solid #000;
        margin: 20px 0;
      }
      button {
        margin: 10px;
        padding: 10px;
        font-size: 14px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <h3>Assine abaixo</h3>
    <canvas id="signatureCanvas" width="400" height="200"></canvas><br>
    <button id="clearButton">Limpar</button>
    <button id="saveButton">Salvar Assinatura</button>

    <script>
      var canvas = document.getElementById("signatureCanvas");
      var ctx = canvas.getContext("2d");
      var isDrawing = false;

      canvas.addEventListener("mousedown", function(e) {
        isDrawing = true;
        ctx.moveTo(e.offsetX, e.offsetY);
      });

      canvas.addEventListener("mousemove", function(e) {
        if (isDrawing) {
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
        }
      });

      canvas.addEventListener("mouseup", function() {
        isDrawing = false;
      });

      document.getElementById("clearButton").onclick = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };

      document.getElementById("saveButton").onclick = function() {
        var dataURL = canvas.toDataURL();  // Captura a assinatura
        google.script.run.saveSignature(dataURL);  // Envia para o Apps Script
        google.script.host.close();  // Fecha o pop-up
      };
    </script>
  </body>
</html>
