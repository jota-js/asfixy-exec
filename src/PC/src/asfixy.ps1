Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$grayColor = [System.Drawing.Color]::FromArgb(240, 240, 240)
$darkGrayColor = [System.Drawing.Color]::FromArgb(100, 100, 100)
$lightGrayColor = [System.Drawing.Color]::FromArgb(200, 200, 200)

$scriptDirectory = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$correctKey = "AsfixyPs1Update"

function Show-FileEditor {
    param (
        [string]$filePath
    )

    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        $editorForm = New-Object System.Windows.Forms.Form
        $editorForm.Text = [System.IO.Path]::GetFileName($filePath)
        $editorForm.Size = New-Object System.Drawing.Size(400, 270)
        $editorForm.StartPosition = 'CenterScreen'
        
        $textBox = New-Object System.Windows.Forms.TextBox
        $textBox.Multiline = $true
        $textBox.Dock = 'Fill'
        $textBox.ScrollBars = 'Vertical'
        $textBox.Text = $content
        
        $saveButton = New-Object System.Windows.Forms.Button
        $saveButton.Text = 'Save'
        $saveButton.Dock = 'Bottom'
        $saveButton.Add_Click({
            try {
                Set-Content -Path $filePath -Value $textBox.Text
                [System.Windows.Forms.MessageBox]::Show("File saved successfully.", "Success", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
            } catch {
                [System.Windows.Forms.MessageBox]::Show($_.Exception.Message, "Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
            }
        })

        $editorForm.Controls.Add($textBox)
        $editorForm.Controls.Add($saveButton)
        [void] $editorForm.ShowDialog()
    } else {
        [System.Windows.Forms.MessageBox]::Show("File not found: $filePath", "Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
    }
}

function Run-JavaScriptFile {
    param (
        [string]$filePath
    )
    try {
        if (Test-Path $filePath) {
            $process = Start-Process node -ArgumentList "`"$filePath`"" -NoNewWindow -PassThru -Wait
            if ($process.ExitCode -ne 0) {
                throw "Ocorreu um erro ao executar o arquivo JavaScript. Código de saída: $($process.ExitCode)"
            }
        } else {
            throw "O arquivo JavaScript não foi encontrado: $filePath"
        }
    } catch {
        [System.Windows.Forms.MessageBox]::Show($_.Exception.Message, "Erro", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
    }
}

function Show-MainForm {
    $form = New-Object System.Windows.Forms.Form
    $form.Text = 'Main Form'
    $form.Size = New-Object System.Drawing.Size(400, 250)
    $form.StartPosition = 'CenterScreen'
    $form.BackColor = $grayColor
    $form.FormBorderStyle = 'None'
    
    $titleBar = New-Object System.Windows.Forms.Panel
    $titleBar.Dock = 'Top'
    $titleBar.Height = 30
    $titleBar.BackColor = $darkGrayColor
    $titleBar.Cursor = [System.Windows.Forms.Cursors]::SizeAll
    $form.Controls.Add($titleBar)
    
    $titleLabel = New-Object System.Windows.Forms.Label
    $titleLabel.Text = 'Main Form'
    $titleLabel.Font = New-Object System.Drawing.Font 'Arial', 16
    $titleLabel.ForeColor = [System.Drawing.Color]::White
    $titleLabel.AutoSize = $true
    $titleLabel.Location = New-Object System.Drawing.Point(10, 5)
    $titleBar.Controls.Add($titleLabel)
    
    $minimizeButton = New-Object System.Windows.Forms.Button
    $minimizeButton.Text = '-'
    $minimizeButton.Size = New-Object System.Drawing.Size(30, 30)
    $minimizeButton.BackColor = $darkGrayColor
    $minimizeButton.Location = New-Object System.Drawing.Point(320, 0)  # Localização fixa
    $minimizeButton.Add_Click({
        $form.WindowState = [System.Windows.Forms.FormWindowState]::Minimized
    })
    $titleBar.Controls.Add($minimizeButton)
    
    $closeButton = New-Object System.Windows.Forms.Button
    $closeButton.Text = 'X'
    $closeButton.Size = New-Object System.Drawing.Size(30, 30)
    $closeButton.BackColor = $darkGrayColor
    $closeButton.Location = New-Object System.Drawing.Point(360, 0)  # Localização fixa
    $closeButton.Add_Click({
        $form.Close()
    })
    $titleBar.Controls.Add($closeButton)

    $runButton = New-Object System.Windows.Forms.Button
    $runButton.Location = New-Object System.Drawing.Point(50, 60)
    $runButton.Size = New-Object System.Drawing.Size(300, 40)
    $runButton.Text = 'Inject'
    $runButton.BackColor = $lightGrayColor
    $runButton.ForeColor = [System.Drawing.Color]::Black
    $runButton.Add_Click({
        $jsFilePath = Join-Path $scriptDirectory 'js\main.js'
        Run-JavaScriptFile -filePath $jsFilePath
    })

    $showScriptButton = New-Object System.Windows.Forms.Button
    $showScriptButton.Location = New-Object System.Drawing.Point(50, 110)
    $showScriptButton.Size = New-Object System.Drawing.Size(300, 40)
    $showScriptButton.Text = 'Show Script'
    $showScriptButton.BackColor = $lightGrayColor
    $showScriptButton.ForeColor = [System.Drawing.Color]::Black
    $showScriptButton.Add_Click({
        $execJsPath = Join-Path $scriptDirectory 'js\exec.js'
        Show-FileEditor -filePath $execJsPath
    })

    $showConfigButton = New-Object System.Windows.Forms.Button
    $showConfigButton.Location = New-Object System.Drawing.Point(50, 160)
    $showConfigButton.Size = New-Object System.Drawing.Size(300, 40)
    $showConfigButton.Text = 'Show Config'
    $showConfigButton.BackColor = $lightGrayColor
    $showConfigButton.ForeColor = [System.Drawing.Color]::Black
    $showConfigButton.Add_Click({
        $configJsPath = Join-Path $scriptDirectory 'js\config.js'
        Show-FileEditor -filePath $configJsPath
    })

    $form.Controls.Add($runButton)
    $form.Controls.Add($showScriptButton)
    $form.Controls.Add($showConfigButton)

    $form.Add_Shown({ $form.Activate() })
    [void] $form.ShowDialog()
}

function Show-LoginForm {
    $loginForm = New-Object System.Windows.Forms.Form
    $loginForm.Text = 'Login'
    $loginForm.Size = New-Object System.Drawing.Size(300, 150)
    $loginForm.StartPosition = 'CenterScreen'
    $loginForm.BackColor = $grayColor
    $loginForm.FormBorderStyle = 'None'
    
    $titleBar = New-Object System.Windows.Forms.Panel
    $titleBar.Dock = 'Top'
    $titleBar.Height = 30
    $titleBar.BackColor = $darkGrayColor
    $titleBar.Cursor = [System.Windows.Forms.Cursors]::SizeAll
    $loginForm.Controls.Add($titleBar)
    
    $titleLabel = New-Object System.Windows.Forms.Label
    $titleLabel.Text = 'Login'
    $titleLabel.Font = New-Object System.Drawing.Font 'Arial', 16
    $titleLabel.ForeColor = [System.Drawing.Color]::White
    $titleLabel.AutoSize = $true
    $titleLabel.Location = New-Object System.Drawing.Point(10, 5)
    $titleBar.Controls.Add($titleLabel)
    
    $keyLabel = New-Object System.Windows.Forms.Label
    $keyLabel.Location = New-Object System.Drawing.Point(10, 50)
    $keyLabel.Size = New-Object System.Drawing.Size(100, 20)
    $keyLabel.Text = 'Enter Key:'
    $keyLabel.BackColor = $grayColor
    $keyLabel.ForeColor = [System.Drawing.Color]::Black
    
    $keyTextBox = New-Object System.Windows.Forms.TextBox
    $keyTextBox.Location = New-Object System.Drawing.Point(120, 50)
    $keyTextBox.Size = New-Object System.Drawing.Size(150, 20)
    $keyTextBox.UseSystemPasswordChar = $true
    $keyTextBox.BackColor = [System.Drawing.Color]::White
    $keyTextBox.ForeColor = [System.Drawing.Color]::Black
    
    $loginButton = New-Object System.Windows.Forms.Button
    $loginButton.Location = New-Object System.Drawing.Point(100, 90)
    $loginButton.Size = New-Object System.Drawing.Size(100, 30)
    $loginButton.Text = 'Login'
    $loginButton.BackColor = $lightGrayColor
    $loginButton.ForeColor = [System.Drawing.Color]::Black
    $loginButton.Add_Click({
        if ($keyTextBox.Text -eq $correctKey) {
            $loginForm.DialogResult = [System.Windows.Forms.DialogResult]::OK
            $loginForm.Close()
        } else {
            [System.Windows.Forms.MessageBox]::Show("Invalid key. Please try again.", "Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
        }
    })
    
    $loginForm.Controls.Add($keyLabel)
    $loginForm.Controls.Add($keyTextBox)
    $loginForm.Controls.Add($loginButton)
    
    $minimizeButton = New-Object System.Windows.Forms.Button
    $minimizeButton.Text = '_'
    $minimizeButton.Size = New-Object System.Drawing.Size(30, 30)
    $minimizeButton.BackColor = $darkGrayColor
    $minimizeButton.ForeColor = [System.Drawing.Color]::White
    $minimizeButton.FlatStyle = 'Flat'
    $minimizeButton.Location = New-Object System.Drawing.Point(240, 0)  # Localização fixa
    $minimizeButton.Add_Click({
        $loginForm.WindowState = [System.Windows.Forms.FormWindowState]::Minimized
    })
    $titleBar.Controls.Add($minimizeButton)
    
    $closeButton = New-Object System.Windows.Forms.Button
    $closeButton.Text = 'X'
    $closeButton.Size = New-Object System.Drawing.Size(30, 30)
    $closeButton.BackColor = $darkGrayColor
    $closeButton.ForeColor = [System.Drawing.Color]::White
    $closeButton.FlatStyle = 'Flat'
    $closeButton.Location = New-Object System.Drawing.Point(270, 0)  # Localização fixa
    $closeButton.Add_Click({
        $loginForm.Close()
    })
    $titleBar.Controls.Add($closeButton)

    $drag = $false
    $startX = 0
    $startY = 0
    
    $titleBar.Add_MouseDown({
        $drag = $true
        $startX = [System.Windows.Forms.Cursor]::Position.X - $loginForm.Left
        $startY = [System.Windows.Forms.Cursor]::Position.Y - $loginForm.Top
    })
    
    $titleBar.Add_MouseMove({
        if ($drag) {
            $loginForm.Left = [System.Windows.Forms.Cursor]::Position.X - $startX
            $loginForm.Top = [System.Windows.Forms.Cursor]::Position.Y - $startY
        }
    })
    
    $titleBar.Add_MouseUp({
        $drag = $false
    })
    
    $loginForm.ShowDialog()
    
    return $loginForm.DialogResult
}

[System.Windows.Forms.MessageBox]::Show("Click 'OK' to continue. UI won't work until script injection!", "Welcome to Asfixy!", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
$loginResult = Show-LoginForm

if ($loginResult -eq [System.Windows.Forms.DialogResult]::OK) {
    Show-MainForm
}
