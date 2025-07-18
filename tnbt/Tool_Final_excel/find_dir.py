import os



base_dir = os.path.dirname(os.path.abspath(__file__))
print(base_dir)
template_dir = os.path.join(base_dir, "template.xlsx")
print(template_dir)