document.addEventListener("DOMContentLoaded", () => {
  // === Crear producto ===
  const btnCrear = document.getElementById("btn-crear-producto");
  if (btnCrear) {
    btnCrear.addEventListener("click", async () => {
      const r = await Swal.fire({
        title: "Crear producto",
        text: "¿Deseas ir al formulario de creación?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "Cancelar",
      });
      if (r.isConfirmed) window.location.href = "/admin/productos/nuevo";
    });
  }

  // === Crear nuevo admin ===
  const btnNuevoAdmin = document.getElementById("btn-nuevo-admin");
  if (btnNuevoAdmin) {
    btnNuevoAdmin.addEventListener("click", async () => {
      const r = await Swal.fire({
        title: "Nuevo administrador",
        text: "¿Deseas ir al formulario de creación?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "Cancelar",
      });
      if (r.isConfirmed) window.location.href = "/admin/usuarios/nuevo";
    });
  }

  // === Eliminar administrador ===
  document.querySelectorAll(".btn-eliminar-admin").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.currentTarget.dataset.id;
      const confirm = await Swal.fire({
        title: "¿Eliminar administrador?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      });
      if (!confirm.isConfirmed) return;

      try {
        const res = await fetch(`/admin/usuarios/${id}`, { method: "DELETE" });
        const data = await res.json();

        if (res.status === 403)
          return Swal.fire("Acción no permitida", data.error, "info");

        if (res.ok) {
          await Swal.fire({
            icon: "success",
            title: "Administrador eliminado",
            text: "El registro fue eliminado correctamente.",
            showConfirmButton: false,
            timer: 1500,
          });
          location.reload();
        } else {
          Swal.fire("Error", data.error || "No se pudo eliminar.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Error interno del servidor.", "error");
      }
    });
  });

  // === Eliminar producto ===
  document.querySelectorAll(".btn-eliminar[data-id]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.currentTarget.dataset.id;
      const r = await Swal.fire({
        title: "¿Eliminar producto?",
        text: "Se eliminará permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
      });
      if (!r.isConfirmed) return;

      try {
        const res = await fetch(`/api/admin/productos/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (res.ok) {
          await Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: "Producto eliminado correctamente",
            timer: 1500,
            showConfirmButton: false,
          });
          location.reload();
        } else {
          Swal.fire("Error", data.error || "No se pudo eliminar el producto.", "error");
        }
      } catch {
        Swal.fire("Error", "Error interno del servidor.", "error");
      }
    });
  });

  // === Activar / Desactivar producto ===
  document.querySelectorAll(".toggle-producto").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.currentTarget.dataset.id;
      const r = await Swal.fire({
        title: "Cambiar estado",
        text: "¿Deseas activar o desactivar este producto?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "Cancelar",
      });
      if (!r.isConfirmed) return;

      try {
        const res = await fetch(`/api/admin/productos/${id}/toggle`, { method: "PATCH" });
        const data = await res.json();
        if (res.ok) {
          const nuevoEstado = data.activo ? "activado" : "desactivado";
          await Swal.fire({
            icon: "success",
            title: "Actualizado",
            text: `El producto fue ${nuevoEstado}`,
            timer: 1300,
            showConfirmButton: false,
          });
          location.reload();
        } else {
          Swal.fire("Error", data.error || "No se pudo cambiar el estado", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Error interno del servidor", "error");
      }
    });
  });
});
