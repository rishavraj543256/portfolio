# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['D:\\Rishav_raj\\Adani\\Adani_project\\Adani_project\\Adani_project\\GUI\\gui.py'],
    pathex=[],
    binaries=[],
    datas=[('README.md', '.'), ('requirements.txt', '.'), ('output/format.xlsx', 'output')],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='Adani_Data_Processing',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
