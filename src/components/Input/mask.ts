export function phoneMask(e: React.FormEvent<HTMLInputElement>){
  e.currentTarget.maxLength = 14;
  let value= e.currentTarget.value;

  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{2})(\d)/, '($1)$2')
  value = value.replace(/(\d)(\d{4})$/, '$1-$2')
  e.currentTarget.value = value;
}

