# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

a = Analysis(
    ['main_gui.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('template', 'template'),  # Include template directory
        ('downloads', 'downloads'),  # Include downloads directory
    ],
    hiddenimports=[
        'pandas',
        'openpyxl',
        'tkinter',
        'PIL',
        'google.auth',
        'google.oauth2.credentials',
        'google_auth_oauthlib.flow',
        'googleapiclient.discovery',
        'PyPDF2',
        'docx',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name='TNBT_Excel_Automation',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
) 