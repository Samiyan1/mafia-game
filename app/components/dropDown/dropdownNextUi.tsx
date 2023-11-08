import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useState, useMemo } from 'react';

export default function DropdownNextUi() {
    const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["text"]));
    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    className="text-white"
                    variant="bordered"
                >
                    {selectedValue}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Multiple selection example"
                variant="flat"
                closeOnSelect={false}
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}

            >
                <DropdownItem key="قابلیت" className="text-black" color="danger">قابلیت</DropdownItem>
                <DropdownItem key="استعلام" className="text-warning" color="danger">استعلام</DropdownItem>
                <DropdownItem key="heal" className="text-success" color="success">heal</DropdownItem>
                <DropdownItem key="Shut" className="text-danger" color="danger">Shut Palyer</DropdownItem>

            </DropdownMenu>
        </Dropdown>
    );
}
