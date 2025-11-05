import { Skeleton, Grid, Card, CardContent } from "@mui/material";

export default function WizardsSkeleton() {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="rectangular" height={60} sx={{ mt: 2, borderRadius: 1 }} />
            </CardContent>
            <Skeleton
              variant="rectangular"
              height={36}
              width="50%"
              sx={{ alignSelf: "flex-end", borderRadius: 1, m: 2 }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
