import { TableHeader } from "./table/TableHeader";
import { DataTable } from "./table/DataTable";
import styles from "../styles/components/Manege.module.css";

type ManagePageProps<T extends Record<string, any>> = {
  title: string;
  description: string;
  columns: { label: string; key: keyof T }[];
  data: T[];
  dataDrop?: any,
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onPrint?: (item: any)=> void;
  onClick?: (item: any)=> void;
  children?: React.ReactNode;
};

export const ManagePage = <T extends Record<string, any>>({
  title,
  description,
  columns,
  data,
  dataDrop,
  onAdd,
  onEdit,
  onDelete,
  onPrint,
  onClick
}: ManagePageProps<T>) => {
  return (
    <div className={styles.container}>
      <TableHeader title={title} description={description} />

      <DataTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} onPrint={onPrint} dataDrop={dataDrop} onClick={onClick}/>
    </div>
  );
};
