import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasPrevPage,
  hasNextPage,
  loading,
}) => {
  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      // Логика отображения первой, последней и соседних страниц вокруг текущей
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        const isActive = currentPage === i;
        pages.push(
          <button
            key={i}
            disabled={loading}
            onClick={() => onPageChange(i)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "40px",
              height: "40px",
              padding: "0 10px",
              margin: "0 6px", // Отступы между квадратиками
              border: isActive ? "1px solid #f97316" : "1px solid #e5e7eb", // Оранжевая или серая рамка
              backgroundColor: isActive ? "#f97316" : "#ffffff", // Оранжевый фон для активной
              color: isActive ? "#ffffff" : "#4b5563", // Цвет текста
              fontSize: "14px",
              fontWeight: "500",
              borderRadius: "4px", // Легкое закругление углов как на макете
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {i}
          </button>,
        );
      }
      // Добавление многоточия, если страниц много (как на втором скрине)
      else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span
            key={`ellipsis-${i}`}
            style={{
              padding: "0 8px",
              margin: "0 4px",
              color: "#9ca3af",
              userSelect: "none",
              fontSize: "14px",
            }}
          >
            ...
          </span>,
        );
      }
    }

    return pages;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        margin: "40px 0",
        fontFamily: "sans-serif",
      }}
    >
      {/* Блок цифровых кнопок */}

      {/* Текстовые кнопки Назад / Вперед */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage || loading}
          style={{
            padding: "8px 16px",
            border: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
            color: "#4b5563",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: !hasPrevPage || loading ? "not-allowed" : "pointer",
            opacity: !hasPrevPage || loading ? 0.5 : 1,
          }}
        >
          &lt; Înapoi
        </button>
        <nav
          style={{ display: "inline-flex", alignItems: "center" }}
          aria-label="Pagination"
        >
          {renderPageNumbers()}
        </nav>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage || loading}
          style={{
            padding: "8px 16px",
            border: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
            color: "#4b5563",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: !hasNextPage || loading ? "not-allowed" : "pointer",
            opacity: !hasNextPage || loading ? 0.5 : 1,
          }}
        >
          Înainte &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
