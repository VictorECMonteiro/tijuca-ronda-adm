import { TableHeader } from "./TableHeader";
import { DataTable } from "./DataTable";
import styles from "../../styles/table/Manege.module.css";

export type Column<T> = {
  label: string;
  key?: keyof T;
  render?: (item: T) => React.ReactNode;
};

type ManagePageProps<T extends Record<string, any>> = {
  title: string;
  description: string;
  columns: Column<T>[];
  data: T[];
  dataDrop?: any;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onPrint?: (item: any) => void;
  onClick?: (item: any) => void;
  children?: (item: T) => React.ReactNode;
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
  onClick,
  children,
}: ManagePageProps<T>) => {
  return (
    <div className={styles.container}>
      <TableHeader title={title} description={description} />
      <DataTable
        data={data}
        columns={columns}
        onEdit={onEdit}
        onDelete={onDelete}
        onAdd={onAdd}
        onPrint={onPrint}
        dataDrop={dataDrop}
        onClick={onClick}
      >
        {children}
      </DataTable>
    </div>
  );
};
