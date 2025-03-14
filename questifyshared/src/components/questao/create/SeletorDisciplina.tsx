import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const disciplines = [
  'Algoritmos e Programação I',
  'Algebra Linear',
  'Calculo I',
  'Matemática Discreta',
  'Lógica para Computação',
  'Teoria dos Grafos',
  'Banco de Dados I',
  'Empreendedorismo',
  'Programação Concorrente',
  'Análise de Algoritmos',
  'Compiladores',
];

interface MultipleSelectCheckmarksProps {
  onDisciplinesChange: (selectedDisciplines: string[]) => void;
}

export default function MultipleSelectCheckmarks({ onDisciplinesChange }: MultipleSelectCheckmarksProps) {
  const [disciplineName, setDisciplineName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof disciplineName>) => {
    const {
      target: { value },
    } = event;
    const selectedDisciplines = typeof value === 'string' ? value.split(',') : value;
    setDisciplineName(selectedDisciplines);
    onDisciplinesChange(selectedDisciplines); // Chama a função de callback com as disciplinas selecionadas
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Disciplinas</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={disciplineName}
          onChange={handleChange}
          input={<OutlinedInput label="Disciplinas" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {disciplines.map((discipline) => (
            <MenuItem key={discipline} value={discipline}>
              <Checkbox checked={disciplineName.includes(discipline)} />
              <ListItemText primary={discipline} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
