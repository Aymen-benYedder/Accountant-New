import type { Active, UniqueIdentifier } from '@dnd-kit/core';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import type { ReactNode } from 'react';
import React, { useMemo, useState } from 'react';

import { Table, TableBody, TableContainer } from '@mui/material';
import { DragHandle, SortableItem } from '../SortableItem/SortableItem';
import { SortableOverlay } from '../SortableOverlay/SortableOverlay';

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
}

export function SortableList<T extends BaseItem>({
  items,
  onChange,
  renderItem,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      id='list'
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <TableContainer role='application'>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <SortableContext items={items}>
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  {renderItem(item)}
                </React.Fragment>
              ))}
            </SortableContext>
            <SortableOverlay>
              {activeItem ? renderItem(activeItem) : null}
            </SortableOverlay>
          </TableBody>
        </Table>
      </TableContainer>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
